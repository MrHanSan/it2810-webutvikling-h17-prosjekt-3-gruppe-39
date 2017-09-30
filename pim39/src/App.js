import React, { Component } from 'react';
import logo from './39logo.svg';
import './App.css';

import TodoApp from './todo/TodoApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Personal Information Manager No. 39</h1>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="todoAppCont">
            <TodoApp />
        </div>
      </div>
    );
  }
}

export default App;
