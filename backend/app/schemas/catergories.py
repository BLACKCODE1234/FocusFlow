from pydantic import BaseModel

# Category request/response schemas used for task categorization.
# These models validate incoming category payloads and shape the output returned to clients.

class CatergoryCreate(BaseModel):
    """Payload for creating a new category."""

    # Category name as provided by the user.
    name: str


class CategoryOut(BaseModel):
    """Serialized category returned to API clients."""

    # Database identifier and display name for the category.
    id: int
    name: str

    class Config:
        # Allows this model to be built from ORM objects (e.g., SQLAlchemy models).
        from_attributes = True