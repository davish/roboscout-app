/**
 * Created by davis on 5/28/17.
 */
import React, {Component} from 'react'
import {FormControl} from 'react-bootstrap'

import PlayoffPrediction from './PlayoffPrediction'
import LoadingButton from './LoadingButton';

export default class PredictionSidebar extends Component {
  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <form onSubmit={e => {e.preventDefault(); this.props.getPredictions(e.target.round.value);}}>
          <FormControl type="number" name="round" placeholder="Predict from" />
          <LoadingButton loading={this.props.loading} type="submit">Predict Matches</LoadingButton>
        </form>
        <PlayoffPrediction tournament={this.props.tournament} />
      </div>
    )
  }
}