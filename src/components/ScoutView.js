/**
 * Created by davis on 5/7/17.
 */
import React, {Component} from 'react';
import MatchList from './MatchList';
import RankedList from './RankedList';
import {Grid, Row, Col} from 'react-bootstrap';

export default class ScoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {
          roundNum: 1,
          red1: 4174,
          red2: 6051,
          blue1: 5069,
          blue2: 9371,
          redscore: 150,
          bluescore: 100
        },
        {
          roundNum: 2,
          red1: 4174,
          red2: 5069,
          blue1: 6051,
          blue2: 9371,
          redscore: 200,
          bluescore: 75
        }
      ]
    }
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

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={9}>
            <MatchList matches={this.state.matches}
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