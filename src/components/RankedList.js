/**
 * Created by davis on 5/6/17.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export default class RankedList extends Component {
  render() {
    let body = this.props.rank.map((r, i) => {
      let percentile = 0;
      if (this.props.highlight)
        percentile = r.pop();

      return (<tr style={{color: percentile > this.props.threshold ? 'red': ''}} key={i}>{r.map((b, j) => {
        return <td key={j}>{b}</td>})
      }</tr>)
    });
    return (
      <Table striped condensed hover>
        <thead>
          <tr>
            {this.props.headers.map((h, i) => {return (
              <th key={i}>{h}</th>
            )})}
          </tr>
        </thead>
        <tbody>
        {body}
        </tbody>
      </Table>
    )
  }
}