import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

import './App.css';
import ScoutView from './components/ScoutView';
import SelectTournament from './components/SelectTournament'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: -1
    }
  }

  selectTournament(id) {
    return () => {
      this.setState({tournament: id});
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Roboscout</Link>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Route exact path="/" component={SelectTournament} />
          <Route path="/tournament/:tournament" component={ScoutView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
