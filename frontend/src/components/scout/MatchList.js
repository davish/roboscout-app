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
      let roundNum = this.props.matches[i].roundNum;
      rows.push((<MatchInput key={roundNum}
                             probability={this.props.predictions[roundNum]}
                             match={this.props.matches[i]}
                             updateMatch={this.props.updateMatch(i)} editable={this.props.editable}/>))
    }
    return (
      <div>
        <Button style={{float: 'right'}} bsSize="xsmall">Quick Add Matches</Button>
        <Table condensed>
          <thead>
          <tr>
            <th>#</th>
            <th>Red 1</th>
            <th>Red 2</th>
            <th>Blue 1</th>
            <th>Blue 2</th>
            <th>Red Score</th>
            <th>Blue Score</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          <tr><td><Button onClick={this.props.addMatch}>+</Button></td></tr>
          </tbody>
        </Table>
      </div>
    )
  }
}