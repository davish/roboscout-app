/**
 * Created by davis on 5/5/17.
 */
function teamToMatch(data) {
  let teams = {};
  let teamNames = ['red1', 'red2', 'blue1', 'blue2'];
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (!row.redscore || !row.bluescore) continue;
    for (let t = 0; t < teamNames.length; t++) {
      let n = teamNames[t];
      let team = row[n];
      if (!teams[team])
        teams[team] = [];
      let r = JSON.parse(JSON.stringify((row)));
      if (n.indexOf('red') > -1)
        r.team = 'red';
      else
        r.team = 'blue';
      r.position = n;
      teams[team].push(r);
    }
  }
  return teams;
}

function teamToMatchScores(teams) {
  let matchScores = {};
  let keys = Object.keys(teams);
  for (let i = 0; i < keys.length; i++) {
    let team = keys[i];
    let matches = teams[team];
    matchScores[team] = [];
    for (let j = 0; j < matches.length; j++) {
      let match = matches[j];
      matchScores[team].push(match[match.team + 'score']);
    }
  }
  return matchScores;
}

function getPartners(matches) {
  let partners = [];
  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];
    let num = parseInt(match.position.slice(-1));
    let teammatePosition = match.team + (num%2+1);
    partners.push(match[teammatePosition]);
  }
  return partners;
}

function avg(l) {
  let sum = 0.0;
  for (let i = 0; i < l.length; i++) {
    sum += parseInt(l[i]);
  }
  if (l.length > 0) return sum/l.length;
  return 0;
}

function mapd(obj, func) {
  let result = {};
  Object.keys(obj).map((k, i) => {
    result[k] = func(obj[k]);
  });
  return result;
}

function zipd(keys, vals) {
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = vals[i];
  }
  return result;
}

function mapzip(l, func) {
  return zipd(l, l.map(func));
}

function std(values){
  let a = avg(values);

  let squareDiffs = values.map(function(value){
    let diff = value - a;
    return diff * diff;
  });

  let avgSquareDiff = avg(squareDiffs);

  return Math.sqrt(avgSquareDiff);
}

export default function scout(data) {
  let m = teamToMatch(data);
  let tm = teamToMatchScores(m);
  let teams = Object.keys(tm);

  let tp = mapd(m, getPartners);
  let ta = mapd(tm, a => {return avg(a)});

  let tpa = mapd(tp, tms => {return avg(tms.map(t => {return ta[t]}))});

  let mod = mapzip(teams, t => {return ta[t] - tpa[t]});

  let expo = mapzip(teams, t => {return ta[t]/2+mod[t]});
  let avgexpo = avg(Object.keys(expo).map(k => {return expo[k]}));

  let stdev = mapzip(teams, t => {return std(tm[t].map(score => {return score/2+mod[t]}))});

  return mapzip(teams, t => {return {expo: expo[t], variance: stdev[t]}});
}