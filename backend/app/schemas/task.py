from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# Task-related request/response schemas used by the API layer.
# These models validate incoming payloads and shape the data returned to clients.

class TaskCreate(BaseModel):
    """Payload for creating a new task."""

    # Core task details required by the user when creating a task.
    title: str
    notes: Optional[str] = None

    # Optional scheduling and planning metadata.
    due_date: Optional[datetime] = None
    estimated_duration: Optional[int] = None
    importance: Optional[int] = 3
    category_id: Optional[int] = None


class TaskUpdate(BaseModel):
    """Payload for updating an existing task with partial fields."""

    # All fields are optional to support partial updates.
    title: Optional[str] = None
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    estimated_duration: Optional[int] = None
    importance: Optional[int] = None
    status: Optional[str] = None
    category_id: Optional[int] = None


class TaskOut(BaseModel):
    """Serialized task representation returned to API clients."""

    # Database identifier and primary task information.
    id: int
    title: str
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    estimated_duration: Optional[int] = None
    importance: int
    status: str
    category_id: Optional[int] = None
    created_at: datetime

    class Config:
        # Allows this model to be built from ORM objects (e.g., SQLAlchemy models).
        from_attributes = True