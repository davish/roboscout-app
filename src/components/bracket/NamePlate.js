/**
 * Created by davis on 5/22/17.
 */
import React, {Component} from 'react';

export default class NamePlate extends Component {
  render() {
    let style = {'display': 'inline-block', color: this.props.color || undefined};
    if (this.props.winner) {
      style.position = 'relative';
      style.bottom = '110px';
    }
    return (
      <div style={style} onClick={this.props.onClick}>
        {this.props.alliance.length > 0 ? this.props.alliance[0] : '????'} <br />
        {this.props.alliance.length > 0 ? this.props.alliance[1] : '????'} <br />
        {this.props.alliance.length > 0 ? this.props.alliance[2] : '????'} <br />
      </div>
    )
  }
}