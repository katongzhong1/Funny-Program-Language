import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DateTime } from 'luxon'

class App extends Component {
  render() {
    var string = DateTime.local().setZone('America/New_York').minus({ weeks: 1 }).endOf('day').toISO();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro" text={string}/>
      </div>
    );
  }
}

export default App;
