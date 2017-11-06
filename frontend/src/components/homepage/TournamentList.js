/**
 * Created by davis on 6/28/17.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class TournamentList extends Component {
  render() {
    return (
      <ul>
        {this.props.tournaments.map((t, i) => {
          return <li key={t.id}><Link to={{pathname: '/tournament/'+t.id, state: {name: t.name, event_date: t.event_date}}}>{t.name || 'New Tournament on '+ t.event_date}</Link></li>
        })}
      </ul>
    )
  }
}