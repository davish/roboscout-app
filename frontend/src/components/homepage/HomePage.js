/**
 * Created by davis on 6/28/17.
 */
import React, {Component} from 'react'
import {Jumbotron, Grid, Row, Col, Button, Navbar} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom'
import TournamentList from './TournamentList'

export default class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tournaments: []
    }
  }

  createNewTournament () {
      fetch('/api/tournament/new', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: '{}'
        })
          .then(r => r.json())
          .then(result => {
            let t = this.state.tournaments;
            t.unshift(result);
            this.setState({tournaments: t, newName: ''})
          })
    }

  componentDidMount() {
    fetch('/api/tournament')
      .then(r => {
        return r.json();
      })
      .then(r => {
        this.setState({tournaments: r.tournaments})
      })
  }
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
            <p> <Button bsStyle="primary">Learn More</Button></p>
          </div>
        </Jumbotron>
        <Row>
          <Col sm={6}>
            <h3>Tournaments <Button onClick={this.createNewTournament.bind(this)}>+</Button></h3>
            <TournamentList tournaments={this.state.tournaments}/>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}