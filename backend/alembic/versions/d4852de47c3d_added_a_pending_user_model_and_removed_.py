"""Added a pending user model and removed otp fields in the user model 

Revision ID: d4852de47c3d
Revises: b5288c7b335c
Create Date: 2026-10-01 16:29:14.685386

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'd4852de47c3d'
down_revision: Union[str, Sequence[str], None] = 'b5288c7b335c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'pending_users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('first_name', sa.String(length=100), nullable=False),
        sa.Column('last_name', sa.String(length=100), nullable=False),
        sa.Column('timezone', sa.String(length=50), server_default='UTC', nullable=True),
        sa.Column('otp_code', sa.String(length=255), nullable=False),
        sa.Column('otp_expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email', name='uq_pending_users_email')
    )
    op.create_index(op.f('ix_pending_users_email'), 'pending_users', ['email'], unique=True)
    op.create_index(op.f('ix_pending_users_id'), 'pending_users', ['id'], unique=False)
    op.drop_column('users', 'otp_expires_at')
    op.drop_column('users', 'otp_code')


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column('users', sa.Column('otp_code', mysql.VARCHAR(length=255), nullable=True))
    op.add_column('users', sa.Column('otp_expires_at', mysql.DATETIME(), nullable=True))
    op.drop_index(op.f('ix_pending_users_email'), table_name='pending_users')
    op.drop_index(op.f('ix_pending_users_id'), table_name='pending_users')
    op.drop_table('pending_users')
