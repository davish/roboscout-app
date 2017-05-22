/**
 * Created by davis on 5/19/17.
 */
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import AllianceInput from './AllianceInput';
import Bracket from './bracket/Bracket';
export default class PlayoffPrediction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alliances: [
        ['6929', '8686', '5916'],
        ['5843', '4174', '8645'],
        ['4029', '5414', '12529'],
        ['7129', '7244', '9794']
      ],
      prediction: null,
      snapshot: null
    }
  }

  change(num) {
    return i => {
      return e => {
        let a = this.state.alliances.concat([]);
        a[num-1][i] = e.target.value;
        this.setState({alliances: a})
      }

    }
  }

  getPlayoffPredictions(e) {
    const form = e.target;
    e.preventDefault();
    const payload = {alliances: this.state.alliances};
    fetch('/api/tournament/1/predict/playoffs?json='+encodeURIComponent(JSON.stringify(payload)))
      .then(r => {
        return r.json();
      })
      .then(res => {
        console.log(res);
        this.setState({prediction: res['results'][0], snapshot: res['results'][1]})
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getPlayoffPredictions.bind(this)}>
           <AllianceInput teams={this.state.alliances[0]} onChange={this.change(1)} />
           <AllianceInput teams={this.state.alliances[1]} onChange={this.change(2)} />
           <AllianceInput teams={this.state.alliances[2]} onChange={this.change(3)} />
           <AllianceInput teams={this.state.alliances[3]} onChange={this.change(4)} />
           <Button type="submit">Predict Playoffs</Button>
        </form>

        <Bracket alliances={this.state.alliances} prediction={this.state.prediction} />
      </div>

    )
  }
}