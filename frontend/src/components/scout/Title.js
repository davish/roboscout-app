/**
 * Created by davis on 6/30/17.
 */
import React, {Component} from 'react'

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false
    }
  }

  render() {

    let name = this.props.name || 'Double-Click To Set Name';

    let h = <span style={{cursor:'pointer'}} onClick={() => {this.setState({input: true})}}>{name}</span>;

    if (this.state.input)
      h = <input value={this.props.name}
                 onChange={this.props.onChange}
                 onKeyPress={e => {if (e.which == 13) this.setState({input: false})}}
                 onBlur={() => {this.setState({input: false})}}
      />;
    return (
        <h3>
          {h}
          &nbsp;
          <small>{new Date(this.props.event_date).toDateString()}</small>
        </h3>
    )
  }
}