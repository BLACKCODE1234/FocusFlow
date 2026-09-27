from typing import Optional

from pydantic import BaseModel, EmailStr, model_validator


# This schema defines what a frontend must send when creating a new account.
# It validates the request body before the user is saved to the database.
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str
    timezone: Optional[str] = None  # Frontend may include this silently without a separate form field.

    @model_validator(mode="after")
    def passwords_match(self):
        """Ensure the password and confirmation match before saving the user."""
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


# This schema defines the expected request body for the login endpoint.
# The frontend sends an email and password to receive a JWT token.
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# This is the response shape returned after a successful login.
# It contains the JWT access token and the type of token used.
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# This schema is used to carry token-related claims such as the user email.
# It is helpful when decoding token payloads or representing auth session details.
class TokenData(BaseModel):
    email: Optional[str] = None


# This schema defines how user data is returned to the client after registration or profile fetch.
# It hides sensitive fields like the password hash and exposes only safe public info.
class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    is_verified: bool

    class Config:
        from_attributes = True