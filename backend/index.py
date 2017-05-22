import os
import csv
import json

from flask import Flask, request, jsonify
from flask.ext.sqlalchemy import SQLAlchemy

from models import *
from algorithm import roboscout, match_simulation

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def update_match(m, t):
  match = Match(m, t)
  q = db.session.query(Match).filter_by(tournament=t, round_num=m['round_num']).first()
  if q is not None:
    match.id = q.id
    q = db.session.merge(match)
  else:
    db.session.add(match)

  db.session.commit()


@app.route("/api/")
def hello():
  return "Hello World!"


@app.route('/api/tournament/1', methods=['GET'])
def getCSV():  
  return jsonify({'tournament': matchlist})

@app.route('/api/tournament/1/predict/prelims', methods=['GET'])
def predict_tournament():
  start = int(request.args.get('start', len(matchlist)*2/3))
  scout = roboscout.scout(matchlist[:start])
  pred = match_simulation.simulate_matchlist(matchlist, scout, start)
  r = {p['roundNum']: {'red': p['prediction'][0], 'blue': p['prediction'][1]} for p in pred}
  return jsonify({'data': r})

@app.route('/api/tournament/1/predict/playoffs', methods=['GET'])
def predict_playoffs():
  alliances = json.loads(request.args.get('json', '{}'))['alliances']
  scout = roboscout.scout(matchlist)
  res = match_simulation.simulate_playoffs(alliances, scout)
  return jsonify({'results': res})

@app.route('/api/tournament/<t>/update-round', methods=['POST'])
def update_round(t):
  match = request.get_json()
  update_match(match, t)

@app.route('/api/tournament/<t>/update', methods=['POST'])
def batch_update_tournament(t):
  data = request.get_json()
  matches = data['matches']
  for match in matches:
    update_match(match, t)


matchlist = []
if __name__ == "__main__":
  with open('matchlist.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
      matchlist.append(row)
  app.run()