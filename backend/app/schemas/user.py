from pydantic import BaseModel, EmailStr,model_validator
from typing import Optional

class UserCreate(BaseModel):
    first_name:str
    last_name:str
    email: EmailStr
    password: str
    confirm_password:str
    timezone: Optional[str] = None   # frontend sends this silently, no form field

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    is_verified: bool
    class Config:
        from_attributes = True