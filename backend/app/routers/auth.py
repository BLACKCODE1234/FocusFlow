from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import authenticate_user, create_access_token, get_current_user, hash_password
from app.database.session import get_db
from app.models.users import User
from app.schemas.user import Token, UserCreate, UserLogin, UserOut

# Router for authentication and account-related endpoints.
router = APIRouter()


# Register a new user account.
# This route validates that the email is not already in use, hashes the password,
# and saves the user to the database before returning the created record.
@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check whether an account already exists with the same email.
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Build a new User model instance from the validated request payload.
    new_user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        timezone=user_in.timezone,
    )

    # Save the new user to the database.
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Return the newly created user to the client.
    return new_user


@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    """Authenticate a user and return a signed JWT access token."""
    user = authenticate_user(db, user_in.email, user_in.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """Return the authenticated user's profile from the token."""
    return current_user