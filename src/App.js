import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ParamsExample from './components/params';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Login />
      </div>
    );
  }
}

export default App;
