/**
 * Created by davis on 5/24/17.
 */

const roles = ['red1', 'red2', 'blue1', 'blue2'];

export default function getRankings(matchlist) {
  let teams = {};
  for (let i = 0; i < matchlist.length; i++) {
    let match = matchlist[i];

    const diff = getDiff(match);
    for (let j = 0; j < roles.length; j++) {
      if (!(roles[j] in match))
        continue;
      let team = match[roles[j]];
      if (!(team in teams)) {
        teams[team] = {qp: 0, rp: 0}
      }
      teams[team].qp += diff[team].qp;
      teams[team].rp += diff[team].rp;
    }
  }

  // return teams;

  let ranking = [];
  let k = Object.keys(teams);
  for (let i = 0; i < k.length; i++) {
    ranking.push({
      team: k[i],
      ...teams[k[i]]
    })
  }
  ranking = ranking.sort((b, a) => {
    let x = a.qp - b.qp;
    return x == 0 ? a.rp - b.rp : x;

  });

  return ranking;
}

function getDiff(match) {
  let rp = 0, qpb = 0, qpr = 0;

  let rs = parseInt(match.redscore);
  let bs = parseInt(match.bluescore);
  if (rs > bs) {
    rp = bs;
    qpr = 2;
  }
  else if (rs < bs) {
    rp = rs;
    qpb = 2;
  } else {
    rp = rs;
    qpr = qpb = 1;

  }

  let d = {};

  d[match.red1] = {qp: qpr, rp: rp};
  d[match.red2] = {qp: qpr, rp: rp};
  d[match.blue1]= {qp: qpb, rp: rp};
  d[match.blue2]= {qp: qpb, rp: rp};

  return d;
}