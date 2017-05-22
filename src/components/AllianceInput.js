/**
 * Created by davis on 5/19/17.
 */
import React, {Component} from 'react';

export default class AllianceInput extends Component {
  render() {
    return (
      <div>
        <input type="number" value={this.props.teams[0]} onChange={this.props.onChange(0)} placeholder="####" />
        <input type="number" value={this.props.teams[1]} onChange={this.props.onChange(1)} placeholder="####" />
        <input type="number" value={this.props.teams[2]} onChange={this.props.onChange(2)} placeholder="####" />
      </div>
    )
  }
}