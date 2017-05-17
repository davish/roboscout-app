/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import MatchList from './MatchList';
import RankedList from './RankedList';
import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';

export default class ScoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
      ],
      predictions: {}
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
    fetch('/api/tournament/1/prediction?start='+startRound)
      .then(r => {
        return r.json()
      })
      .then(response => {
        this.setState({'predictions': response.data});
      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={3}>
            <form onSubmit={e => {e.preventDefault(); this.getPredictions(e.target.round.value);}}>
              <FormControl type="number" name="round" placeholder="Predict from" />
              <Button type="submit">Predict Matches</Button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <MatchList matches={this.state.matches}
                       predictions={this.state.predictions}
                       updateMatch={this.updateMatch.bind(this)}
                       addMatch={this.addMatch.bind(this)} />

          </Col>
          <Col sm={3}>
            <RankedList matches={this.state.matches}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}