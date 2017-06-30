/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormControl, PageHeader} from 'react-bootstrap';

import PlayoffPrediction from './PlayoffPrediction'
import LoadingButton from './LoadingButton';
import MatchList from './MatchList';
import RankPanel from './RankPanel';
import Sidebar from './Sidebar';

export default class ScoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
      ],
      predictions: {},
      sidebar: false,
      metadata: {}
    }
  }

  componentDidMount() {
    this.setState({metadata: {name: this.props.location.state.name || '', event_date: this.props.location.state.event_date || ''}})
    fetch('/api/tournament/'+this.props.match.params.tournament)
      .then(r => {
        return r.json()
      })
      .then(result => {
        this.setState({matches: result.matches, metadata: result.tournament})
      })
  }

  componentDidUpdate(prevProps, prevState) {
    fetch('/api/tournament/'+this.props.match.params.tournament+'/update', {
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
    fetch('/api/tournament/'+this.props.match.params.tournament+'/predict/prelims?start='+startRound)
      .then(r => {
        return r.json()
      })
      .then(response => {
        this.setState({loading: false, 'predictions': response.data});
        location.hash = '#' + startRound;
      })
  }

  render() {

    return (
      <div>
        <Grid>
            <h3>
              {this.state.metadata.name}
              &nbsp;
              <small>{new Date(this.state.metadata.event_date).toDateString()}</small>
            </h3>
          <Row>
            <Col sm={8}>
              <MatchList matches={this.state.matches}
                         predictions={this.state.predictions}
                         updateMatch={this.updateMatch.bind(this)}
                         addMatch={this.addMatch.bind(this)} />

            </Col>
            <Col sm={4}>
              <RankPanel matches={this.state.matches}
                         toggleSidebar={() => {this.setState({sidebar: !this.state.sidebar})}} />
            </Col>

          </Row>
        </Grid>
        <Sidebar show={this.state.sidebar} toggle={() => {this.setState({sidebar: !this.state.sidebar})}}>
          <form onSubmit={e => {e.preventDefault(); this.getPredictions(e.target.round.value);}}>
            <FormControl type="number" name="round" placeholder="Predict from" />
            <LoadingButton loading={this.state.loading} type="submit">Predict Matches</LoadingButton>
          </form>
          <PlayoffPrediction tournament={this.props.match.params.tournament} />
        </Sidebar>
      </div>
    )
  }
}