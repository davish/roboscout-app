/**
 * Created by davis on 5/24/17.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import scout from '../algorithms/roboscout'
import TournamentRanking from 'TournamentRanking'
import RankedList from 'RankedList'


export default class RankPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scout: {},
      showscout: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({scout: scout(nextProps.matches)});
  }

  render() {
    let comp = <RankedList scout={this.state.scout} />;



    return (
      {comp}
    )
  }
}