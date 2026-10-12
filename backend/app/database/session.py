from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

# Create the SQLAlchemy engine used across the app.
# This keeps a single database connection configuration for all models and queries.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600
)


# Base class for all ORM models so Alembic and SQLAlchemy can introspect metadata.
class Base(DeclarativeBase):
    pass

# Session factory used to open database sessions for each request or operation.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency used by FastAPI routes to provide a database session for each request.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
