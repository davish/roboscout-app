/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import MatchList from './MatchList';
import RankPanel from './RankPanel';

import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';
import Sidebar from 'react-sidebar'

import getRankings from '../algorithms/matchlist';


import PlayoffPrediction from './PlayoffPrediction'

export default class ScoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
      ],
      predictions: {},
      sidebar: false
    }
  }

  componentDidMount() {
    fetch('/api/tournament/1')
      .then(r => {
        return r.json()
      })
      .then(result => {
        this.setState({matches: result['tournament']})
      })
  }

  addMatch() {
    let matches = this.state.matches;
    matches.push({roundNum: matches.length+1});
    this.setState({matches: matches});
  }

  updateMatch(index) {
    return (p, val) => {
      let matches = this.state.matches;
      matches[index][p] = val;
      this.setState({matches: matches});
    };
  }

  getPredictions(startRound) {
    fetch('/api/tournament/1/predict/prelims?start='+startRound)
      .then(r => {
        return r.json()
      })
      .then(response => {
        this.setState({'predictions': response.data});
        location.hash = '#' + startRound;
      })
  }

  render() {
    const sidebar = (
      <div style={{backgroundColor: 'white'}}>
        <form onSubmit={e => {e.preventDefault(); this.getPredictions(e.target.round.value);}}>
          <FormControl type="number" name="round" placeholder="Predict from" />
          <Button type="submit">Predict Matches</Button>
        </form>
        <PlayoffPrediction />
      </div>
    );
    return (
      <div>
        <Sidebar sidebar={sidebar} open={this.state.sidebar} pullRight={true} onSetOpen={open => {this.setState({sidebar: open}); console.log(getRankings(this.state.matches));}}>
        <Grid>
          <Row>
            <Col sm={2} smOffset={10}>
              <Button onClick={() => {this.setState({sidebar: !this.state.sidebar})}}>Slide</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <MatchList matches={this.state.matches}
                         predictions={this.state.predictions}
                         updateMatch={this.updateMatch.bind(this)}
                         addMatch={this.addMatch.bind(this)} />

            </Col>
            <Col sm={4}>
              <RankPanel matches={this.state.matches}/>
            </Col>

          </Row>
        </Grid>
        </Sidebar>
      </div>
    )
  }
}