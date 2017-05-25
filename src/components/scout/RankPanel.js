/**
 * Created by davis on 5/24/17.
 */
import React, {Component} from 'react';
import scout from '../../algorithms/roboscout'
import RankedList from './RankedList'
import getRankings from '../../algorithms/matchlist'

import {Button} from 'react-bootstrap'

export default class RankPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scout: {},
      showscout: true,
      expos: {},
      threshold: 90
    }
  }

  componentDidMount() {
    this.setState(this.getUpdatedScout(this.props.matches));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getUpdatedScout(nextProps.matches));
  }

  getUpdatedScout(matches) {
    let s = scout(matches);
    let expos = Object.keys(s).map(team => {return parseInt(s[team].expo)});
    expos = expos.sort((a, b) => {return parseInt(a) - parseInt(b)});
    return {scout: s, expos: expos}
  }

  getExpoPercentile(expo) {
    let index = this.state.expos.map(e => {return Math.round(e)}).indexOf(Math.round(expo));
    if (index < 0) return 0;

    return index/this.state.expos.length*100;
  }

  render() {
    let headers = [];
    let rank = [];
    let highlightTopTenth = false;

    if (this.state.showscout) {
      headers = ['Team', 'ExpO', 'Variance'];

      let teams = Object.keys(this.state.scout);
      for (let i = 0; i < teams.length; i++) {
        let d = this.state.scout[teams[i]];
        d.team = teams[i];
        rank.push(d);
      }

      rank = rank.sort((a, b) => {
        return b.expo - a.expo;
      }).map(r => {return [r.team, Math.round(r.expo), Math.round(r.variance)]});
    }
    else {
      headers = ['Rank', 'Team', 'QP', 'RP', 'ExpO'];
      rank = getRankings(this.props.matches).map((row, i) => {
        return [
          i+1,
          row.team,
          row.qp,
          row.rp,
          Math.round(this.state.scout[row.team].expo),
          this.getExpoPercentile(this.state.scout[row.team].expo)
        ]
      });
      highlightTopTenth = true;
    }

    return (
      <div>
        <Button style={{float: 'left'}} bsSize="xsmall" onClick={() => {this.setState({showscout: !this.state.showscout})}}>
          {this.state.showscout ? 'Show Rankings' : 'Show Roboscout'}
        </Button>
        <input type="number"
               style={{display: this.state.showscout ? 'none': '', width: '40px', float: 'right'}}
               value={this.state.threshold}
               onChange={e => {this.setState({threshold: e.target.value})}} />
        <RankedList headers={headers}
                    rank={rank}
                    highlight={highlightTopTenth}
                    threshold={this.state.threshold} />
      </div>
    )
  }
}