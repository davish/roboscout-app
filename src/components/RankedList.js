/**
 * Created by davis on 5/6/17.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import scout from '../algorithms/roboscout'

export default class RankedList extends Component {
  render() {
    let s = scout(this.props.matches);
    let rank = [];

    let teams = Object.keys(s);
    for (let i = 0; i < teams.length; i++) {
      let d = s[teams[i]];
      d.team = teams[i];
      rank.push(d);
    }

    rank = rank.sort((a, b) => {
      return b.expo - a.expo;
    });

    let output = [];

    for (let i=0; i < rank.length; i++)
      output.push(<tr key={i}>
        <td>{rank[i].team}</td>
        <td>{Math.round(rank[i].expo)}</td>
        <td>{Math.round(rank[i].variance)}</td>
      </tr>)

    return (
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Team</th>
            <th>Expected Output</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
        {output}
        </tbody>
      </Table>
    )
  }
}