/**
 * Created by davis on 6/30/17.
 */

import React, {Component} from 'react'

import {Modal, FormControl} from 'react-bootstrap'

export default class MatchAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchIndex: 0,
      fieldIndex: 0
    }
  }

  change(param) {
    return e => {
      let d = {};
      d[param] = e.target.value;
      this.props.updateMatch(this.state.index)(param, e.target.value);
    }
  }

  render() {
    const vals = ['red1', 'red2', 'blue1', 'blue2']
        .map(p => {return this.props.matches[this.state.matchIndex][p]});
    return (
      <Modal show={this.props.show} onHide={this.props.changeModal(false)('matchaddmodal')}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl value={vals[0]} onChange={this.change('red1')}/> <FormControl value={vals[1]} onChange={this.change('red2')}/> <br />
          v.s. <br />
          <FormControl value={vals[2]} onChange={this.change('blue1')}/> <FormControl value={vals[3]} onChange={this.change('blue2')}/>
        </Modal.Body>
      </Modal>
    )
  }
}