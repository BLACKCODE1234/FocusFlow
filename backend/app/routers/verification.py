from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import verify_password

from app.database.session import get_db
from app.models.pending_users import PendingUser
from app.models.users import User
from app.schemas.user import VerifyEmailRequest

router = APIRouter()


@router.post("/verify-email")
def verify_email(payload: VerifyEmailRequest, db: Session = Depends(get_db)):
    # Find the pending registration associated with the submitted email address.
    pending_user = db.query(PendingUser).filter(PendingUser.email == payload.email).first()
    if not pending_user:
        raise HTTPException(status_code=404, detail="Pending registration not found")

    # MySQL DATETIME values are returned without timezone info; treat stored values as UTC.
    otp_expires_at = pending_user.otp_expires_at
    if otp_expires_at is not None and otp_expires_at.tzinfo is None:
        otp_expires_at = otp_expires_at.replace(tzinfo=timezone.utc)

    # Require a stored OTP that has not passed its expiry time.
    if not pending_user.otp_code or not otp_expires_at or otp_expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="OTP expired, request a new one")

    # Compare the submitted code against the stored password-style hash.
    if not verify_password(payload.otp, pending_user.otp_code):
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # Promote the pending user to the verified account table.
    user = User(
        first_name=pending_user.first_name,
        last_name=pending_user.last_name,
        email=pending_user.email,
        hashed_password=pending_user.hashed_password,
        timezone=pending_user.timezone,
        is_verified=True,
    )
    db.add(user)
    db.delete(pending_user)
    db.commit()
    return {"message": "Email verified successfully"}