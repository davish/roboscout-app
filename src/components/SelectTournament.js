/**
 * Created by davis on 5/25/17.
 */
import React, {Component} from 'react';

import {Button, Grid, Row, Col, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default class SelectTournament extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      newName: ''
    }
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

  newTournament(e) {
    e.preventDefault();
    fetch('/api/tournament/new', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': this.state.newName})
    }).then(r => {return r.json()})
      .then(r => {
        let t = this.state.tournaments;
        t.push({id: r.id, name: this.state.newName});
        this.setState({tournaments: t, newName: ''})
      })
  }

  render() {

    return (
      <Grid>
        <Row>

        </Row>
        <Row>
          <Col sm={3}>
            <ul>
              {this.state.tournaments.map((t, i) => {
                return <li key={t.id}><Link to={'/tournament/'+t.id}>{t.name}</Link></li>
              })}
            </ul>
          </Col>
          <Col sm={3}>
            <form onSubmit={this.newTournament.bind(this)}>
              <FormControl placeholder="Tournament Name" value={this.state.newName} onChange={e => {this.setState({newName: e.target.value})}} />
              <Button type="submit">+</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}