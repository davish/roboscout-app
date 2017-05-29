/**
 * Created by davis on 5/22/17.
 */
import React, {Component} from 'react';

import NamePlate from './NamePlate'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
export default class Match extends Component {
  render() {
    let color = 'black';
    if (this.props.winner === 'blue')
      color = 'blue';
    else if (this.props.winner === 'red')
      color = 'red';
    let branch = <span style={{position: 'relative', bottom: '33px', right: '3px'}}>|<br />|<br />|<br />|</span>;
    let sidebranch1 = '';
    let sidebranch2 = '';

    if (this.props.round === 'finals') {
      // branch = '';
      sidebranch1 = <span style={{position: 'relative', bottom: '20px'}}>––––––</span>;
      sidebranch2 = <span style={{position: 'relative', bottom: '20px'}}>–––––</span>;
    }

    let tooltip = <Tooltip id="tooltip">No Prediction Available.</Tooltip>;
    if (this.props.prediction && this.props.prediction.prob)
      tooltip = <Tooltip id="tooltip"> Red: {Math.round(this.props.prediction.prob[0]*10)/10}% Blue: {Math.round(this.props.prediction.prob[1]*10)/10}% </Tooltip>;

    return (
      <OverlayTrigger placement={this.props.round === 'finals' ? 'right' : 'top'} overlay={tooltip}>
        <div style={{'display': 'inline-block', position: 'relative', bottom: this.props.round === 'finals' ? '70px' : '0px'}}>
          {/*{topBranch}*/}

          {sidebranch1}
          <NamePlate color={'red'} alliance={this.props.redAlliance} onClick={this.props.win('red')}/>
          <span style={{position: 'relative', bottom: '20px'}}>––––––––</span>
          <NamePlate color={'blue'} alliance={this.props.blueAlliance} onClick={this.props.win('blue')} />
          {sidebranch2}
          <br />
          {branch}
        </div>
      </OverlayTrigger>

    )

  }
}