from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional


# Input model for sign-up requests before a user is created in the database.
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str
    timezone: Optional[str] = None  # Frontend may send this silently without a dedicated form field.

    @model_validator(mode="after")
    def passwords_match(self):
        """Ensure the password and confirmation match before saving the user."""
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


# Output model used when returning user data to the client.
class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    is_verified: bool

    class Config:
        from_attributes = True