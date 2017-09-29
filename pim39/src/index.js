import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// testing

//import TodoApp from './todo/TodoApp.js';
//ReactDOM.render(<TodoApp />, document.getElementById('root'));


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
