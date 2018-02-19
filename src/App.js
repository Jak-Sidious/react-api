import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routingbasics from './components/try.js';
import ParamsExample from './components/params.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <Routingbasics/>
        <hr/>
        <h1>Using links to change url end slashes</h1>
        <ParamsExample/>
        <hr/>>

      </div>
    );
  }
}

export default App;
