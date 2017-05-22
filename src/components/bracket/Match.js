/**
 * Created by davis on 5/22/17.
 */
import React, {Component} from 'react';

import NamePlate from './NamePlate'

export default class Match extends Component {
  render() {
    let color = 'black';
    if (this.props.winner == 'blue')
      color = 'blue';
    else if (this.props.winner == 'red')
      color = 'red';
    let branch = <span style={{position: 'relative', bottom: '33px', right: '3px', color: color}}>|<br />|<br />|<br />|</span>;
    let topBranch = '';

    if (this.props.round == 'finals') {
      branch = '';
      topBranch = <span style={{position: 'relative', top: '36px', right: '3px', color: color}}>|<br />|<br />|<br />|<br /></span>;

    }
    return (
      <div style={{'display': 'inline-block', position: 'relative', bottom: this.props.round == 'finals' ? '100px' : '0px'}}>
        {topBranch}
        <NamePlate alliance={this.props.redAlliance} onClick={this.props.win('red')}/>
        <span style={{position: 'relative', bottom: '20px', color: color}}>––––––––</span>
        <NamePlate alliance={this.props.blueAlliance} onClick={this.props.win('blue')} />
        <br />
        {branch}
      </div>
    )

  }
}