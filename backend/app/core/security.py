from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db
from app.models.users import User

# FastAPI will read the JWT from the Authorization header in the format:
# Authorization: Bearer <token>
# This tells the app where to look for the access token during protected requests.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")


# Hash a plain-text password before saving it to the database.
# bcrypt adds a random salt automatically to prevent identical passwords from producing
# the same hash across different users.
def hash_password(password: str) -> str:
    """Hash a plain-text password before storing it in the database."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


# Check whether a submitted password matches the stored bcrypt hash.
# The stored hash already contains the salt, so bcrypt can validate it without a separate salt field.
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Validate a password against a stored bcrypt hash."""
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


# Look up a user by email and confirm that the entered password is correct.
# This is used by the /login endpoint before creating a JWT token.
def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Fetch a user by email and validate the provided password."""
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


# Generate a signed JWT for an authenticated user.
# The payload usually contains the user's unique identifier, here stored as `sub`.
# `exp` adds an expiration time so tokens eventually expire and must be refreshed.
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a signed JWT access token for an authenticated user."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta if expires_delta is not None else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


# Decode and validate an incoming bearer token from the request.
# If the token is missing, invalid, expired, or belongs to no user, return a 401 error.
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Decode and validate a bearer token, returning the matching user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode the JWT using the app's secret key and expected algorithm.
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: Optional[str] = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as exc:
        raise credentials_exception from exc

    # Use the email stored in the token to load the actual user from the database.
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    return user