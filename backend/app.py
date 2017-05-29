import os
import csv
import json

from flask import Flask, request, jsonify, send_file, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

from algorithm import roboscout, match_simulation

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import *


def enforce_types(m):
    if m['blue_score'] is not None:
        try:
            m['blue_score'] = int(m['blue_score'])
        except ValueError:
            m['blue_score'] = None
    if m['red_score'] is not None:
        try:
            m['red_score'] = int(m['red_score'])
        except ValueError:
            m['red_score'] = None

    return m


def update_match(m, t, batch_update=False):
    m['round_num'] = m.get('roundNum')
    if 'roundNum' in m : del m['roundNum']
    m['red_score'] = m.get('redscore')
    if 'redscore' in m : del m['redscore']
    m['blue_score'] = m.get('bluescore')
    if 'bluescore' in m : del m['bluescore']

    m = enforce_types(m)

    match = Match(tournament_id=int(t), **m)
    q = db.session.query(Match).filter_by(tournament_id=t, round_num=m['round_num']).first()
    if q is not None:
        match.id = q.id
        q = db.session.merge(match)
    else:
        db.session.add(match)

    if batch_update:
        db.session.commit()

    return match


def match_to_jsonable(t, q):
    matches = q.filter_by(tournament=t).order_by(Match.round_num)
    return map(lambda m: m.to_dict(), matches)


def filled_matches(t):
    q = db.session.query(Match)
    for role in ['red1', 'red2', 'blue1', 'blue2']:
        q = q.filter(getattr(Match, role).isnot(None))
    return match_to_jsonable(t, q)


def completed_matches(t):
    q = db.session.query(Match)
    for role in ['red1', 'red2', 'blue1', 'blue2', 'red_score', 'blue_score']:
        q = q.filter(getattr(Match, role).isnot(None))
    return match_to_jsonable(t, q)


def all_matches(t):
    q = db.session.query(Match)
    return match_to_jsonable(t, q)


@app.route("/api/")
def hello():
    return "Hello World!"


@app.route('/api/tournament', methods=['GET'])
def list_tournaments():
    return jsonify({'tournaments': map(lambda t: {'name': t.name, 'id': t.id, 'season': t.season}, db.session.query(Tournament).all())})


@app.route('/api/tournament/<t>/predict/prelims', methods=['GET'])
def predict_tournament(t):
    matchlist = filled_matches(db.session.query(Tournament).get(t))

    start = int(request.args.get('start', len(matchlist)*2/3))
    scout = roboscout.scout(matchlist[:start])
    pred = match_simulation.simulate_matchlist(matchlist, scout, start)
    r = {p['roundNum']: {'red': p['prediction'][0], 'blue': p['prediction'][1]} for p in pred}
    return jsonify({'data': r})


@app.route('/api/tournament/<t>/predict/playoffs', methods=['GET'])
def predict_playoffs(t):
    matchlist = completed_matches(db.session.query(Tournament).get(t))

    alliances = json.loads(request.args.get('json', '{}'))['alliances']
    scout = roboscout.scout(matchlist)
    res = match_simulation.simulate_playoffs(alliances, scout)
    return jsonify({'results': res})


@app.route('/api/tournament/new', methods=['POST'])
def create_tournament():
    t = Tournament()
    body = request.get_json()
    if body is not None:
        t.name = body.get('name')
    db.session.add(t)
    db.session.commit()
    return jsonify({'id': t.id})


@app.route('/api/tournament/<t>')
def get_tournament(t):
    tournament = db.session.query(Tournament).get(t)
    r = {'name': tournament.name, 'id': tournament.id, 'matches': all_matches(tournament)}
    return jsonify(r)


@app.route('/api/tournament/<t>/update-round', methods=['POST'])
def update_round(t):
    match = request.get_json()
    update_match(match, t)
    return jsonify({'result': 'success'})


@app.route('/api/tournament/<t>/update', methods=['POST'])
def batch_update_tournament(t):
    data = request.get_json()
    matches = data.get('matches', [])
    name = data.get('name', None)
    for match in matches:
        update_match(match, t, False)
    if name is not None:
        t = db.session.query(Tournament).get(t)
        t.name = name

    db.session.commit()
    return jsonify({'result': 'success'})


@app.route('/roboscout-app/<path:path>')
def serve_assets(path):
    return send_from_directory('site', path)


@app.route('/')
def serve_index():
    return send_file('site/index.html')

if __name__ == "__main__":
    app.run()