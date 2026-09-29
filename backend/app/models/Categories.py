import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base



class Category(Base):
    # Store user-defined categories in the categories table.
    __tablename__ = "categories"

    # Unique identifier for each category.
    id = Column(Integer, primary_key=True, index=True)

    # Associate this category with its owner in the users table.
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Category label, limited to 100 characters.
    name = Column(String(100), nullable=False)