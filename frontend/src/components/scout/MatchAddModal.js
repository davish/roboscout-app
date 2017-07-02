/**
 * Created by davis on 6/30/17.
 */

import React, {Component} from 'react'

import {Modal, FormControl, Button} from 'react-bootstrap'

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
      this.props.updateMatch(this.state.matchIndex)(param, e.target.value);
    }
  }

  keypress(e) {
    if (e.which == 13) {
      this.setState({fieldIndex: (this.state.fieldIndex+1)%4}, () => {
        document.getElementById('i'+this.state.fieldIndex).focus();
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.matchIndex >= this.props.matches.length) {
      this.props.addMatch()
    }
  }

  render() {
    let match = this.props.matches[this.state.matchIndex] || {};
    const vals = ['red1', 'red2', 'blue1', 'blue2']
        .map(p => {return match[p] || ''});
    return (
      <Modal show={this.props.show} onHide={this.props.changeModal(false)('matchaddmodal')}>
        <Modal.Header closeButton>
          <Modal.Title>Quick Match Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{textAlign: 'center'}}>
            <h2>Round {match.roundNum || this.state.matchIndex+1}</h2>
          </p>
          <p style={{textAlign: 'center'}}>
          Red 1: {' '}
          <input id="i0"
                 type="tel"
                 value={vals[0]}
                 onChange={this.change('red1')}
                 onKeyPress={this.keypress.bind(this)} style={{width: 60}}/> {' '}
          Red 2: {' '}
          <input id="i1"
                 type="tel"
                 value={vals[1]}
                 onChange={this.change('red2')}
                 onKeyPress={this.keypress.bind(this)} style={{width: 60}}/>
          </p>
          <p style={{textAlign: 'center'}}>v.s.</p>
          <p style={{textAlign: 'center'}}>
          Blue 1: {' '}
          <input id="i2"
                 type="tel"
                 value={vals[2]}
                 onChange={this.change('blue1')}
                 onKeyPress={this.keypress.bind(this)} style={{width: 60}}/> {' '}
          Blue 2: {' '}
          <input id="i3"
                 type="tel"
                 value={vals[3]}
                 onChange={this.change('blue2')}
                 onKeyPress={this.keypress.bind(this)} style={{width: 60}}/>
          </p>
          <Button onClick={() => this.setState({matchIndex: Math.max(this.state.matchIndex-1, 0)})}>Back</Button>
          <Button onClick={() => this.setState({matchIndex: this.state.matchIndex+1})} style={{float: 'right'}}>Next</Button>
        </Modal.Body>
      </Modal>
    )
  }
}