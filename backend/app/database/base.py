from sqlalchemy.orm import declarative_base

# Shared declarative base for all SQLAlchemy models in the project.
# Every model class can inherit from this base to register its metadata.
Base = declarative_base()