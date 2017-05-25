/**
 * Created by davis on 5/24/17.
 */
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class LoadingButton extends Component {
  render() {
    return <Button type={this.props.type}>
      {this.props.children} &nbsp;<span style={{display: this.props.loading ? '' : 'none'}}
                                        className="ld ld-ring ld-cycle" />
    </Button>;
  }
}