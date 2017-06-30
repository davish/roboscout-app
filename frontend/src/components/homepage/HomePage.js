/**
 * Created by davis on 6/28/17.
 */
import React, {Component} from 'react'
import {Jumbotron, Grid, Row, Col, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import TournamentList from './TournamentList'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Roboscout</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Grid>
        <Jumbotron>
          <div className="center">
            <h1>Roboscout</h1>
            <p>Rank FTC Teams Better!</p>
            <p><Button>Scout New Tournament</Button> <Button bsStyle="primary">Learn More</Button></p>
          </div>
        </Jumbotron>
        <Row>
          <Col sm={6}>
            <TournamentList />
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}