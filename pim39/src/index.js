import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {Header} from './App';
import registerServiceWorker from './registerServiceWorker';
//import moment from "moment";//



//import TodoApp from './todo/TodoApp.js';
//ReactDOM.render(<TodoApp />, document.getElementById('root'));



ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
