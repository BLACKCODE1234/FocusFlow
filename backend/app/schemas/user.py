from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    timezone: Optional[str] = None   # frontend sends this silently, no form field

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    is_verified: bool
    class Config:
        from_attributes = True