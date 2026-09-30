from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status


from sqlalchemy.orm import Session
from app.schemas.user import VerifyEmailRequest
from app.core.security import verify_password
from app.models.users import User
from app.database.session import get_db

router =APIRouter()


@router.post("/verify-email")
def verify_email(payload: VerifyEmailRequest, db: Session = Depends(get_db)):
    # Find the account associated with the submitted email address.
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Avoid accepting another OTP after the account has been verified.
    if user.is_verified:
        raise HTTPException(status_code=400, detail="Email already verified")
    # Require a stored OTP that has not passed its expiry time.
    if not user.otp_code or not user.otp_expires_at or user.otp_expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="OTP expired, request a new one")
    # Compare the submitted code against the stored password-style hash.
    if not verify_password(payload.otp, user.otp_code):
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # Mark the account verified and remove the one-time code after successful use.
    user.is_verified = True
    user.otp_code = None
    user.otp_expires_at = None
    db.commit()
    return {"message": "Email verified successfully"}