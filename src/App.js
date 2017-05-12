import React, { Component } from 'react';
import './App.css';
import ScoutView from './components/ScoutView';

class App extends Component {
  render() {
    fetch('/api/').then(e => {
      return e.text();
    }).then(j => {
      console.log(j);
    })
    return (
      <div className="App">
        <ScoutView />
      </div>
    );
  }
}

export default App;
