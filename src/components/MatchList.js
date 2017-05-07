/**
 * Created by davis on 5/4/17.
 */
import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap';
import MatchInput from './MatchInput';

export default class MatchList extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.matches.length; i++) {
      rows.push((<MatchInput key={this.props.matches[i].roundNum}
                             match={this.props.matches[i]}
                             updateMatch={this.props.updateMatch(i)} />))
    }
    return (
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>Red 1</th>
          <th>Red 2</th>
          <th>Blue 1</th>
          <th>Blue 2</th>
          <th>Red Score</th>
          <th>Blue Score</th>
          <th><Button onClick={this.props.addMatch}>+</Button></th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </Table>
    )
  }
}