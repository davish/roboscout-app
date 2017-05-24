/**
 * Created by davis on 5/24/17.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import getRankings from '../algorithms/matchlist'

export default class RankedList extends Component {
  render() {
    let output = getRankings(this.props.matches).map((row, i) => {return (
      <tr>
        <td>{row.team}</td>
        <td>{row.qp}</td>
        <td>{row.rp}</td>
      </tr>
    )});

    return (
      <Table striped condensed hover>
        <thead>
        <tr>
          <th>Team</th>
          <th>QP</th>
          <th>RP</th>
        </tr>
        </thead>
        <tbody>
        {output}
        </tbody>
      </Table>
    )

  }
}