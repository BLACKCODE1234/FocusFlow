"""OTP generation and safe verification."""
from __future__ import annotations

import hashlib
import hmac
import secrets


def generate_otp(length: int = 6) -> str:
    """Generate a cryptographically secure numeric OTP code."""
    return "".join(str(secrets.randbelow(10)) for _ in range(length))


def hash_otp(code: str) -> str:
    """One-way hash for storing an OTP (never store the raw code)."""
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def verify_otp(code: str, code_hash: str) -> bool:
    """Constant-time check: does `code` match the stored hash?"""
    return hmac.compare_digest(hash_otp(code), code_hash or "")