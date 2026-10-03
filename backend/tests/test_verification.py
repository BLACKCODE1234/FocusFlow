from datetime import datetime, timedelta, timezone

import pytest
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.security import hash_password, verify_password
from app.database.session import Base
from app.models.pending_users import PendingUser
from app.routers import verification
from app.schemas.user import ResendOtpRequest


@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    session_local = sessionmaker(bind=engine)
    with session_local() as session:
        yield session
    engine.dispose()


def make_pending_user(otp_expires_at):
    return PendingUser(
        email="alice@example.com",
        hashed_password=hash_password("secret123"),
        first_name="Alice",
        last_name="Example",
        timezone="UTC",
        otp_code=hash_password("123456"),
        otp_expires_at=otp_expires_at,
    )


def test_resend_otp_updates_expired_pending_registration(db_session, monkeypatch):
    pending_user = make_pending_user(datetime.now(timezone.utc) - timedelta(minutes=1))
    db_session.add(pending_user)
    db_session.commit()
    sent_emails = []
    monkeypatch.setattr(
        verification,
        "send_verification_email",
        lambda email, otp: sent_emails.append((email, otp)),
    )

    response = verification.resend_otp(
        ResendOtpRequest(email="alice@example.com"),
        db_session,
    )

    assert response == {"message": "A new verification code has been sent"}
    assert len(sent_emails) == 1
    assert sent_emails[0][0] == "alice@example.com"
    assert verify_password(sent_emails[0][1], pending_user.otp_code)
    assert pending_user.otp_expires_at > datetime.now(timezone.utc).replace(tzinfo=None)
    assert pending_user.first_name == "Alice"


def test_resend_otp_rejects_unexpired_code(db_session, monkeypatch):
    pending_user = make_pending_user(datetime.now(timezone.utc) + timedelta(minutes=5))
    db_session.add(pending_user)
    db_session.commit()
    original_otp_hash = pending_user.otp_code
    monkeypatch.setattr(
        verification,
        "send_verification_email",
        lambda *_: pytest.fail("Email should not be sent before the OTP expires"),
    )

    with pytest.raises(HTTPException) as error:
        verification.resend_otp(
            ResendOtpRequest(email="alice@example.com"),
            db_session,
        )

    assert error.value.status_code == 400
    assert pending_user.otp_code == original_otp_hash


def test_resend_otp_requires_pending_registration(db_session):
    with pytest.raises(HTTPException) as error:
        verification.resend_otp(
            ResendOtpRequest(email="missing@example.com"),
            db_session,
        )

    assert error.value.status_code == 404
