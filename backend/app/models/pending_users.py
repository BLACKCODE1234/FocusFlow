from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.session import Base

# Stores users who have started signup but have not yet completed email verification.
class PendingUser(Base):
    __tablename__ = "pending_users"

    # Unique identifier for the pending signup record.
    id = Column(Integer, primary_key=True, index=True)
    # Email used for signup and login verification; must be unique per pending user.
    email = Column(String(255), unique=True, index=True, nullable=False)
    # Password hash created during registration before the user is fully activated.
    hashed_password = Column(String(255), nullable=False)
    # Account holder's first and last name as provided during registration.
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    # User timezone used for localized scheduling and reporting.
    timezone = Column(String(50), server_default="UTC")
    # One-time password issued for email validation.
    otp_code = Column(String(255), nullable=False)
    # Expiration timestamp for the OTP so old codes cannot be used indefinitely.
    otp_expires_at = Column(DateTime(timezone=True), nullable=False)
    # Time when this pending registration was created.
    created_at = Column(DateTime(timezone=True), server_default=func.now())