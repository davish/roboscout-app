"""empty message

Revision ID: 94fc51564d2a
Revises: 54419eff1536
Create Date: 2017-05-28 14:12:13.725896

"""

# revision identifiers, used by Alembic.
revision = '94fc51564d2a'
down_revision = '54419eff1536'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tournaments', sa.Column('season', sa.String(), server_default='2016-2017', nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tournaments', 'season')
    # ### end Alembic commands ###
