import React, {Component} from 'react';
import logo from './39logo.svg';
import './App.css';

import TodoApp from './todo/TodoApp.js';

class Header extends Component {
    render() {
        return (
            <div id="pim_header">
                <div id="logo_title">
                    <img src={logo} id="pim_logo" alt="PIM39 logo" />
                    <h1><span>Personal Information Manager No. 39</span></h1>
                </div>
                <nav id="navbar">
                    <button type="button" className="active_button">Calendar</button>
                    <button type="button" id="todo_button">To-do</button>
                    <button type="button">Notes</button>
                </nav>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    kaaaaalender
                </p>
                <div className="todoAppCont">
                    <TodoApp />
                </div>
            </div>
        );
    }
}

export {App as default, Header};
