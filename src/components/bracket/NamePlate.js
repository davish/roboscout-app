/**
 * Created by davis on 5/22/17.
 */
import React, {Component} from 'react';

export default class NamePlate extends Component {
  render() {
    return (
      <div style={{'display': 'inline-block'}} onClick={this.props.onClick}>
        {this.props.alliance[0]} <br />
        {this.props.alliance[1]} <br />
        {this.props.alliance[2]} <br />
      </div>
    )
  }
}