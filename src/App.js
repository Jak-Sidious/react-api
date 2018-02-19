import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/index.js';
import Login from './components/login.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <hr/>
        <Landing/>
        <hr/>
        <Login/>

      </div>
    );
  }
}

export default App;
