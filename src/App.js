import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
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

    let body = <ScoutView tournament={this.state.tournament} back={() => {this.setState({tournament: -1})}} />
    if (this.state.tournament < 0) {
      body = <SelectTournament selectTournament={this.selectTournament.bind(this)}/>
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={SelectTournament} />
          <Route path="/tournament/:tournament" component={ScoutView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
