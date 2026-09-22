from passlib.context import CryptContext

# Handles password hashing and verification using the bcrypt scheme.
# The deprecated="auto" setting keeps compatibility while allowing upgrades over time.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a plain-text password before storing it in the database."""
    return pwd_context.hash(password)