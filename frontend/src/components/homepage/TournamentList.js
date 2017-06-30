/**
 * Created by davis on 6/28/17.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class TournamentList extends Component {
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

  render() {
    return (
        <div>
          <h3>Tournaments</h3>
          <ul>
            {this.state.tournaments.map((t, i) => {
              return <li key={t.id}><Link to={{pathname: '/tournament/'+t.id, state: {name: t.name, event_date: t.event_date}}}>{t.name}</Link></li>
            })}
          </ul>
        </div>
    )
  }
}