import os
import smtplib
import ssl
from email.message import EmailMessage

from dotenv import load_dotenv


load_dotenv()


MAIL_HOST = os.getenv("MAIL_HOST", "smtp.gmail.com")
MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM", MAIL_USERNAME)


def send_otp_email(recipient: str, otp: str) -> None:
    """Send an OTP verification email."""

    if not MAIL_USERNAME or not MAIL_PASSWORD:
        raise RuntimeError(
            "Gmail SMTP credentials are not configured."
        )

    message = EmailMessage()
    message["Subject"] = "Swift Car Wash - OTP Verification"
    message["From"] = MAIL_FROM
    message["To"] = recipient

    message.set_content(
        f"Your Swift Car Wash verification code is {otp}.\n\n"
        "This code expires in 10 minutes.\n"
        "Do not share this code with anyone."
    )

    context = ssl.create_default_context()

    with smtplib.SMTP(MAIL_HOST, MAIL_PORT, timeout=30) as server:
        server.starttls(context=context)
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.send_message(message)
