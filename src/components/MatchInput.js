/**
 * Created by davis on 5/4/17.
 */
import React, { Component } from 'react';
import {FormControl} from 'react-bootstrap'


export default class MatchInput extends Component {
  change(param) {
    return e => {
      let d = {};
      d[param] = e.target.value;
      this.props.updateMatch(param, e.target.value);
    }
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.match.roundNum}
        </td>
        <td><FormControl type="text" className="in" value={this.props.match.red1 || '0000'} onChange={this.change('red1')}  /></td>
        <td><FormControl type="text" className="in" value={this.props.match.red2 || '0000'} onChange={this.change('red2')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.blue1 || '0000'} onChange={this.change('blue1')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.blue2 || '0000'} onChange={this.change('blue2')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.redscore || '0'} onChange={this.change('redscore')} /></td>
        <td><FormControl type="text" className="in" value={this.props.match.bluescore || '0'} onChange={this.change('bluescore')} /></td>
      </tr>
    )
  }
}