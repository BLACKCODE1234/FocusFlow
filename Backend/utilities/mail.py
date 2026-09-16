"""Email helpers — compose and send OTP emails via the shared mailer."""
from __future__ import annotations

import os

from dotenv import load_dotenv

from settings.mail_setup import mailer
from utilities.otp import generate_otp

load_dotenv()

OTP_EXPIRE_MINUTES = int(os.getenv("OTP_EXPIRE_MINUTES", "10"))

_PURPOSE_TITLES = {
    "verify": "Verify your email",
    "reset": "Reset your password",
}


def send_otp_email(to_email: str, purpose: str = "verify") -> str:
    """Generate an OTP, email it, and return the raw code.

    Callers should immediately store `otp.hash_otp(code)` — never the raw code.
    `purpose` is one of: "verify" (email verification) or "reset" (password reset).
    """
    code = generate_otp()
    title = _PURPOSE_TITLES.get(purpose, _PURPOSE_TITLES["verify"])

    text_body = (
        f"{title} — FocusFlow AI\n\n"
        f"Your code is: {code}\n\n"
        f"This code expires in {OTP_EXPIRE_MINUTES} minutes.\n"
        f"If you didn't request this, ignore this email.\n\n"
        f"— FocusFlow AI"
    )

    mailer.send(
        to_email=to_email,
        subject=f"{title} — your FocusFlow code: {code}",
        text_body=text_body,
    )

    return code