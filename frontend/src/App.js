import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

import './App.css';
import ScoutView from './components/scout/ScoutView';
import HomePage from './components/homepage/HomePage'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: {}
    }
  }

  selectTournament(t) {
    return () => {
      this.setState({tournament: t});
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route path="/tournament/:tournament" component={ScoutView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
