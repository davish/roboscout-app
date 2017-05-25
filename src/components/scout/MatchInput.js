/**
 * Created by davis on 5/4/17.
 */
import React, { Component } from 'react';
import {FormControl, OverlayTrigger, Tooltip} from 'react-bootstrap'


export default class MatchInput extends Component {
  change(param) {
    return e => {
      let d = {};
      d[param] = e.target.value;
      this.props.updateMatch(param, e.target.value);
    }
  }

  getColor(prob) {
    if (!prob)
      return {'backgroundColor': 'rgba(255, 255, 255, 1)'};

    let q = Math.abs(prob.red-prob.blue)/100;

    if (prob.red > prob.blue)
      return {'backgroundColor': 'rgba(255, 73, 82, '+q+')'};
    else
      return {'backgroundColor': 'rgba(100, 149, 237, '+q+')'};

  }

  render() {
    let tooltip;
    if (this.props.probability)
      tooltip = (<Tooltip id="tooltip">Red: {Math.round(this.props.probability.red*10)/10}% Blue: {Math.round(this.props.probability.blue*10)/10}%</Tooltip>)
    else
      tooltip = (<Tooltip id="tooltip">No Prediction Available.</Tooltip>);
    return (
      <tr style={this.getColor(this.props.probability)}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <td>
            <a style={{'textDecoration': 'none', 'color': 'inherit', cursor: 'text'}} href={'#'+this.props.match.roundNum} name={this.props.match.roundNum}>{this.props.match.roundNum}</a>
          </td>
        </OverlayTrigger>
        <td><FormControl type="text" className="in" value={this.props.match.red1 || ''} onChange={this.change('red1')}  /></td>
        <td><FormControl type="text" className="in" value={this.props.match.red2 || ''} onChange={this.change('red2')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.blue1 || ''} onChange={this.change('blue1')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.blue2 || ''} onChange={this.change('blue2')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.redscore || ''} onChange={this.change('redscore')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.bluescore || ''} onChange={this.change('bluescore')} /></td>
      </tr>
    )
  }
}