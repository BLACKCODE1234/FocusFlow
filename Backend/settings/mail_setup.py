"""Single SMTP mail service setup for FocusFlow AI."""
from __future__ import annotations

import os
import smtplib
import ssl
from email.message import EmailMessage

from dotenv import load_dotenv


load_dotenv()

# Gmail SMTP credentials, see .env.example:
#   Google Account -> Security -> 2-Step Verification (must be ON) -> App passwords
MAIL_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
MAIL_PORT = int(os.getenv("SMTP_PORT", "587"))
MAIL_USERNAME = os.getenv("GMAIL_USER")
MAIL_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "FocusFlow AI")


class Mailer:
    """Thin SMTP wrapper used by every email helper in the project."""

    def __init__(
        self,
        host: str = MAIL_HOST,
        port: int = MAIL_PORT,
        username: str | None = MAIL_USERNAME,
        password: str | None = MAIL_PASSWORD,
        from_name: str = MAIL_FROM_NAME,
    ) -> None:
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.from_name = from_name
        self.from_addr = f"{from_name} <{username or ''}>"

    def send(self, to_email: str, subject: str, text_body: str) -> None:
        """Send a plain-text email to `to_email` over STARTTLS.

        Raises RuntimeError if the account is missing credentials, or
        re-raises smtplib errors on connection/login failures.
        """
        if not self.username or not self.password:
            raise RuntimeError(
                "Gmail SMTP credentials are not configured. "
                "Set GMAIL_USER and GMAIL_APP_PASSWORD in Backend/.env"
            )

        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = self.from_addr
        message["To"] = to_email
        message.set_content(text_body)

        context = ssl.create_default_context()

        with smtplib.SMTP(self.host, self.port, timeout=30) as server:
            server.starttls(context=context)
            server.login(self.username, self.password)
            server.send_message(message)


# Shared singleton, import as: `from settings.mail_setup import mailer`
mailer = Mailer()