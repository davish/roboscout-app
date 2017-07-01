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

    let cols = [];

    if (this.props.editable) {
      cols = ['red1', 'red2', 'blue1', 'blue2', 'redscore', 'bluescore']
          .map(p => <td><FormControl type="text" className="in" value={this.props.match[p] || ''}
                                     onChange={this.change(p)}/></td>);
    } else {
      cols = ['red1', 'red2', 'blue1', 'blue2', 'redscore', 'bluescore']
          .map(p => <td>{this.props.match[p] || ''}</td>);
    }

    return (
      <tr style={this.getColor(this.props.probability)}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <td>
            <a style={{'textDecoration': 'none', 'color': 'inherit', cursor: 'text'}} href={'#'+this.props.match.roundNum} name={this.props.match.roundNum}>{this.props.match.roundNum}</a>
          </td>
        </OverlayTrigger>
        {cols}
      </tr>
    )
  }
}