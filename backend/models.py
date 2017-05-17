from index import db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

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

  red_probability = db.Column(db.Float)
  blue_probability = db.Column(db.Float)

  tournament_id = db.Column(db.Integer, ForeignKey('tournaments.id'))
  tournament = relationship('Tournament', back_populates='matches')

  def init(self, m, tournament):
    self.round_num = m['round_num']
    self.red1 = m['red1']
    self.red2 = m['red2']
    self.blue1 = m['blue1']
    self.blue2 = m['blue2']

    self.red_score = m.get('red_score', 0)
    self.blue_score = m.get('blue_score', 0)

    self.red_probability = m.get('red_probability', 0)
    self.blue_probability = m.get('blue_probability', 0)

    self.tournament_id = tournament

  def __repr__(self):
    return '<id {}>'.format(self.id)

class Tournament(db.Model):
  __tablename__ = 'tournaments'
  id = db.Column(db.Integer, primary_key=True)

  def __repr__(self):
    return '<id {}>'.format(self.id)