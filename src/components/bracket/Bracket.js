/**
 * Created by davis on 5/22/17.
 */
import React, {Component} from 'react';

import NamePlate from './NamePlate'
import Match from './Match'

export default class Bracket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'SF1': 'blue',
      'SF2': 'red',
      'F': 'red'
    }
  }

  getFinalsRedAlliance() {
    if (this.state.SF1 == 'red')
      return this.props.alliances[0];
    else
      return this.props.alliances[3];
  }
  getFinalsBlueAlliance() {
    if (this.state.SF2 == 'red')
      return this.props.alliances[1];
    else
      return this.props.alliances[2];
  }

  getFinalsProbability() {
    return this.props.prediction ? this.props.prediction[this.getFinalsRedAlliance().join('-')]['F'][this.getFinalsBlueAlliance().join('-')].prob : [0,0];
  }

  getFinalsColor() {
    let prob = this.props.prediction ? this.props.prediction[this.getFinalsRedAlliance().join('-')]['F'][this.getFinalsBlueAlliance().join('-')].prob : [0,0];
    if (prob[0] > prob[1])
      return 'red';
    else if (prob[1] > prob[0])
      return 'blue';
    return '';
  }

  pickWinner(match) {
    return color => {
      return () => {
        let s = {};
        s[match] = color;
        this.setState(s, () => {
          this.getFinalsProbability();
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Match redAlliance={this.props.alliances[0]}
               blueAlliance={this.props.alliances[3]}
               winner={this.state.SF1}
               win={this.pickWinner('SF1')}
        />
        <span style={{paddingRight: '40px', paddingLeft: '40px'}}> </span>
        <Match redAlliance={this.props.alliances[1]}
               blueAlliance={this.props.alliances[2]}
               winner={this.state.SF2}
               win={this.pickWinner('SF2')}
        />
        <div style={{position: 'relative', bottom: '50px', right: '5px'}}>
          <span style={{color: this.state.SF1}}>––––––––––––––</span><span style={{color: this.state.SF2}}>–––––––––––––</span>
        </div>
        <Match redAlliance={this.getFinalsRedAlliance()}
               blueAlliance={this.getFinalsBlueAlliance()}
               winner={this.getFinalsColor()}
               win={() => {}}
               round={'finals'}
        />
      </div>
    )
  }
}