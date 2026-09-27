from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import Base, engine
from app.models import users  # noqa: F401 - ensures the User model is registered with SQLAlchemy
from app.routers.auth import router as auth_router

# Create database tables if they do not exist yet.
# For this project, Alembic is also configured, so this is mainly useful for local development.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FocusFlow API",
    version="1.0.0",
    description="AI-powered productivity and task planning backend",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods =["*"],
    allow_headers =["*"],
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "FocusFlow API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
