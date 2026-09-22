import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


# User table represents the main application account.
# It stores login credentials and personal profile details for each user.
class User(Base):
    __tablename__ = "users"

    # Unique record identifier for each user.
    id = Column(Integer, primary_key=True, index=True)

    # Name fields collected during registration.
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)

    # Email address is the account identifier and must be unique.
    email = Column(String(255), unique=True, index=True, nullable=False)

    # Password is stored as a hash and never in plain text.
    hashed_password = Column(String(255), nullable=False)

    # Local timezone preference for the user.
    timezone = Column(String(50), nullable=True)

    # Tracks whether the user has completed verification.
    is_verified = Column(Boolean, default=False, nullable=False)

    # Audit timestamps used to track account creation and updates.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())