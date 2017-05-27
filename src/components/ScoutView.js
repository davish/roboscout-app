/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormControl, Glyphicon} from 'react-bootstrap';
import Sidebar from 'react-sidebar'

import PlayoffPrediction from './scout/PlayoffPrediction'
import LoadingButton from './scout/LoadingButton';
import MatchList from './scout/MatchList';
import RankPanel from './scout/RankPanel';

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
    fetch('/api/tournament/'+this.props.tournament)
      .then(r => {
        return r.json()
      })
      .then(result => {
        this.setState({matches: result.matches})
      })
  }

  componentDidUpdate(prevProps, prevState) {
    fetch('/api/tournament/'+this.props.tournament+'/update', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({matches: this.state.matches})
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
    this.setState({loading: true});
    fetch('/api/tournament/'+this.props.tournament+'/predict/prelims?start='+startRound)
      .then(r => {
        return r.json()
      })
      .then(response => {
        this.setState({loading: false, 'predictions': response.data});
        location.hash = '#' + startRound;
      })
  }

  render() {
    const sidebar = (
      <div style={{backgroundColor: 'white'}}>
        <form onSubmit={e => {e.preventDefault(); this.getPredictions(e.target.round.value);}}>
          <FormControl type="number" name="round" placeholder="Predict from" />
          <LoadingButton loading={this.state.loading} type="submit">Predict Matches</LoadingButton>
        </form>
        <PlayoffPrediction tournament={this.props.tournament} />
      </div>
    );
    return (
      <div>
        <Sidebar sidebar={sidebar} open={this.state.sidebar} pullRight={true} onSetOpen={open => {this.setState({sidebar: open})}}>
          <Grid>
            <Row>
              <Col sm={2}>
                <Button onClick={this.props.back}>&lt;</Button>
              </Col>
              <Col sm={2} smOffset={8}>
                <Button onClick={() => {this.setState({sidebar: !this.state.sidebar})}}>Predictions</Button>
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