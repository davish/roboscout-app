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
      'SF1': '',
      'SF2': '',
      'F': ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.snapshot && nextProps.snapshot) {
      const snap = nextProps.snapshot;
      let s = {};
      if (snap['SF-1'][1][0] > snap['SF-1'][1][1]) {
        s.SF1 = 'red';
      }
      else if (snap['SF-1'][1][0] < snap['SF-1'][1][1]) {
        s.SF1 = 'blue';
      }

      if (snap['SF-2'][1][0] > snap['SF-2'][1][1]) {
        s.SF2 = 'red';
      }
      else if (snap['SF-2'][1][0] < snap['SF-2'][1][1]) {
        s.SF2 = 'blue';
      }
      this.setState(s);
    }
  }

  getSFPrediciton(sf) {
    let alliance;
    if (sf == 'SF1') {
      alliance = this.props.alliances[0];
    }
    else if (sf == 'SF2') {
      alliance = this.props.alliances[1];
    }
    return this.props.prediction ? this.props.prediction[alliance.join('-')]['SF'] : null;
  }

  getFinalsRedAlliance() {
    if (this.props.alliances) {
      if (this.state.SF1 == 'red')
        return this.props.alliances[0];
      else if (this.state.SF1 == 'blue')
        return this.props.alliances[3];
      return [];
    }
  }
  getFinalsBlueAlliance() {
    if (this.props.alliances) {
      if (this.state.SF2 == 'red')
        return this.props.alliances[1];
      else if (this.state.SF2 == 'blue')
        return this.props.alliances[2];
      return [];
    }
  }

  getFinalsPrediction() {
    return this.props.prediction ? this.props.prediction[this.getFinalsRedAlliance().join('-')]['F'][this.getFinalsBlueAlliance().join('-')] : {};
  }

  getFinalsProbability() {
    return this.getFinalsPrediction().prob || [0,0]
  }

  getFinalsColor() {
    let prob = this.getFinalsProbability();
    if (prob[0] > prob[1])
      return 'red';
    else if (prob[1] > prob[0])
      return 'blue';
    return '';
  }

  getWinner() {
    if (this.getFinalsColor() == 'red')
      return this.getFinalsRedAlliance();
    else if (this.getFinalsColor() == 'blue')
      return this.getFinalsBlueAlliance();
    return [];
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
               prediction={this.getSFPrediciton('SF1')}
        />
        <span style={{paddingRight: '40px', paddingLeft: '40px'}}> </span>
        <Match redAlliance={this.props.alliances[1]}
               blueAlliance={this.props.alliances[2]}
               winner={this.state.SF2}
               win={this.pickWinner('SF2')}
               prediction={this.getSFPrediciton('SF2')}
        />
        <br />
        {/*<div style={{position: 'relative', bottom: '50px', right: '5px'}}>*/}
          {/*<span style={{color: this.state.SF1}}>––––––––––––––</span><span style={{color: this.state.SF2}}>–––––––––––––</span>*/}
        {/*</div>*/}
        <Match redAlliance={this.getFinalsRedAlliance()}
               blueAlliance={this.getFinalsBlueAlliance()}
               winner={''}
               win={() => {}}
               round={'finals'}
               prediction={this.getFinalsPrediction()}
        />
        <br />
        <NamePlate color={this.getFinalsColor()} winner alliance={this.getWinner()}/>
      </div>
    )
  }
}