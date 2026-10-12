import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum,DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

# models/tasks.py
class Task(Base):
    # Store task records in the tasks table.
    __tablename__ = "tasks"

    # Unique identifier for each task.
    id = Column(Integer, primary_key=True, index=True)

    # User who owns this task.
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Optional category used to organize the task.
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    # Short task title.
    title = Column(String(255), nullable=False)

    # Optional notes with additional task details.
    notes = Column(Text, nullable=True)

    # Optional due date and time for the task.
    due_date = Column(DateTime(timezone=True), nullable=True)

    # Optional estimate of how long the task will take.
    estimated_duration = Column(Integer, nullable=True)

    # Importance rating, defaulting to 3.
    importance = Column(Integer, default=3)

    # Task progress state, initially pending.
    status = Column(String(50), default="pending")

    # Timestamp set when the task is first saved.
    created_at = Column(DateTime(timezone=True), server_default=func.now())