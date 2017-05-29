/**
 * Created by davis on 5/28/17.
 */
import React, {Component} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Button} from 'react-bootstrap'
import './Sidebar.css'
export default class Sidebar extends Component {
  render() {
    return (
      <CSSTransitionGroup transitionName="example"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}>
        {this.props.show ?
          <div className="sidebar">
            <Button style={{float: 'right'}} bsStyle="link" onClick={this.props.toggle}>x</Button> <br />
            {this.props.children}
          </div>
          : null}
      </CSSTransitionGroup>
    )
  }
}