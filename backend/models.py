from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from index import db

class Match(db.Model):
  __tablename__ = 'matches'
  id = db.Column(db.Integer, primary_key=True)

  round_num = db.Column(db.Integer)

  red1 = db.Column(db.String())
  red2 = db.Column(db.String())
  blue1 = db.Column(db.String())
  blue2 = db.Column(db.String())

  red_score = db.Column(db.Integer)
  blue_score = db.Column(db.Integer)

  tournament_id = db.Column(db.Integer, ForeignKey('tournaments.id'))
  tournament = relationship('Tournament', backref='matches')

  def to_dict(self):
    return {
    'red1': self.red1,
    'red2': self.red2,
    'blue1': self.blue1,
    'blue2': self.blue2,
    'redscore': self.red_score,
    'bluescore': self.blue_score,
    'roundNum': self.round_num
    }

  def __repr__(self):
    return '<Match {}>'.format(self.id)

class Tournament(db.Model):
  __tablename__ = 'tournaments'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  date_created = db.Column(db.DateTime, server_default=db.text('NOW()'))
  season = db.Column(db.String(), server_default='2016-2017')

  def __repr__(self):
    return '<Tournament {}>'.format(self.id)