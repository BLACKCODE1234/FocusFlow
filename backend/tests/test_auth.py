from datetime import timedelta

from jose import jwt
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.core.security import authenticate_user, create_access_token, hash_password, verify_password
from app.database.session import Base
from app.models.users import User


def test_create_access_token_round_trip():
    token = create_access_token({"sub": "alice@example.com"}, expires_delta=timedelta(minutes=5))
    assert token
    payload = jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM],
    )
    assert payload["sub"] == "alice@example.com"


def test_authenticate_user_validates_password():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)

    with SessionLocal() as db:
        user = User(
            first_name="Alice",
            last_name="Example",
            email="alice@example.com",
            hashed_password=hash_password("secret123"),
            timezone="UTC",
        )
        db.add(user)
        db.commit()

        auth_user = authenticate_user(db, "alice@example.com", "secret123")
        assert auth_user is not None
        assert auth_user.email == "alice@example.com"
        assert verify_password("secret123", auth_user.hashed_password)
        assert authenticate_user(db, "alice@example.com", "wrongpass") is None
