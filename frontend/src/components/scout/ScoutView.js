/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormControl, PageHeader, Modal} from 'react-bootstrap';

import PlayoffPrediction from './PlayoffPrediction'
import LoadingButton from './LoadingButton';
import MatchList from './MatchList';
import RankPanel from './RankPanel';
import Sidebar from './Sidebar';
import Title from './Title'

import MatchAddModal from './MatchAddModal'

window.matchupdatetimeout = null;

export default class ScoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
      ],
      predictions: {},
      sidebar: false,
      metadata: {},
      matchaddmodal: false,
      scoremodal: false,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  resize() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    // window.addEventListener('resize', this.resize.bind(this));
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
    clearTimeout(window.matchupdatetimeout);
    window.matchupdatetimeout = setTimeout(() => {
      fetch('/api/tournament/'+this.props.match.params.tournament+'/update', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matches: this.state.matches,
          tournament: this.state.metadata
        })
      })
    }, 500)
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

  changeModal(c) {
    return modal => {
      return () => {
        let d = {};
        d[modal] = c;
        this.setState(d);
      }
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Title name={this.state.metadata.name} 
                 event_date={this.state.metadata.event_date} 
                 onChange={(e) => {let m = Object.assign({}, this.state.metadata); m.name = e.target.value; this.setState({metadata: m})}}
          />
          <Row>
            <Col sm={4} smPush={8}>
              <RankPanel matches={this.state.matches}
                         toggleSidebar={() => {this.setState({sidebar: !this.state.sidebar})}} />
            </Col>
            <Col sm={8} smPull={4}>
              <MatchList matches={this.state.matches}
                         predictions={this.state.predictions}
                         updateMatch={this.updateMatch.bind(this)}
                         addMatch={this.addMatch.bind(this)}
                         openModal={this.changeModal(true)}
                         closeModal={this.changeModal(false)} editable={this.state.width > 640} />

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
        <MatchAddModal show={this.state.matchaddmodal}
                       matches={this.state.matches}
                       changeModal={this.changeModal.bind(this)}
                       updateMatch={this.updateMatch.bind(this)}
                       addMatch={this.addMatch.bind(this)}
        />
      </div>
    )
  }
}