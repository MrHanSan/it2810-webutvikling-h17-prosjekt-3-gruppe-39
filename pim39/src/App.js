import React, {Component} from 'react';
import logo from './39logo.svg';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nb';
import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import LocalStore from './todo/LocalStore.js';
import TodoApp from './todo/TodoApp.js';
import Calendar from './todo/Calendar.js';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
moment.locale('en-gb');


/**
 * Header with title and navbar
 */
class Header extends Component {
    render() {
        return (
            <div id="pim_header">
                <div id="logo_title">
                    <img src={logo} id="pim_logo" alt="PIM39 logo" />
                    <h1><span>Personal Information Manager No. 39</span></h1>
                </div>
                <nav id="navbar">
                    <button type="button" id="calendar_button" className="nav_button active_button">Calendar</button>
                    <button type="button" id="todo_button" className="nav_button">To-do</button>
                    <button type="button" id="notes_button" className="nav_button">Notes</button>
                </nav>
            </div>
        );
    }
}


/**
 * Parent Component for application
 */
class App extends Component {
    constructor(props) {
        super(props);
        
        var storedTodo;
        var highestID = 0;
        if(localStorage.getItem("TODOs")){
            storedTodo = JSON.parse(localStorage.getItem("TODOs"));
            storedTodo.sort(function (a, b){
                return  new Date(a.date) - new Date(b.date);
            });
            highestID = Math.max.apply(Math, storedTodo.map(function(o){return o.id}));
        }else{
            storedTodo = [];
        }
        
        
        this.state = {
            navTab: 'calendar', // Valid states: calendar, todo, notes
            landscapeMode: true, // Landscape mode when we have room for both calendar and todo list
            todoItems: storedTodo, // Fetch Todo items from deep storage
            highestID: highestID
        }
        // Properly bind this to handlers to ensure access to state
        this.handleResize = this.handleResize.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    }
    /**
     * [[Description]]
     */
    componentDidMount() {
        this.handleResize(); // Set state based on viewport size
        window.addEventListener('resize', this.handleResize);
        // iOS (and other mobile) delayed event to increase chance of correct behaviour on rotation
        window.addEventListener('orientationchange', () => setTimeout(this.handleResize, 250));
        
        // Add navbar buttons click listeners
        // TODO suboptimal solution
        const navList = document.getElementsByClassName('nav_button');
        for (let i = 0; i < navList.length; i++) {
            navList[i].addEventListener('click', this.handleNavClick);
        }
    }
    /**
     * [[Description]]
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    /**
     * [[Description]]
     */
    handleResize() {
        const portraitWidth = 600,
              landscapeWidth = 800;
        
        if (window.innerWidth > landscapeWidth) {
            if (this.state.navTab === 'todo') {
                this.setState({
                    navTab: 'calendar'
                });
            }
            this.setState({
                landscapeMode: true
            });
        } else if (window.innerWidth > portraitWidth) {
            this.setState({
                landscapeMode: false
            });
        } else {
            this.setState({
                landscapeMode: false
            });
        }
    }
    /**
     * [[Description]]
     * @param {object} event [[Description]]
     */
    handleNavClick(event) {
        let oldState = this.state.navTab;
        document.getElementById(oldState + '_button').classList.remove('active_button');
        event.currentTarget.classList.add('active_button');
        
        if (event.currentTarget.id === 'calendar_button') this.setState({navTab: 'calendar'});
        else if (event.currentTarget.id === 'todo_button') this.setState({navTab: 'todo'});
        else if (event.currentTarget.id === 'notes_button') this.setState({navTab: 'notes'});
    }
    /**
     * [[Description]]
     * @param {object} event [[Description]]
     * @param {object} item  [[Description]]
     */
    handleTodoSubmit(event, item) {
        // set ID for the new item
        // TODO something with highest ID
        let newTodoItems = [...this.state.todoItems, item];
        this.setState({
            todoItems: newTodoItems, // adds item to the visible todo list,
            highestID: this.state.highestID + 1
        });
        
        // sets todoitems to localstorage, can now be extracted from other apps on the site.
//        localStorage.setItem("TODOs", JSON.stringify([...this.state.items, item]));
        
        LocalStore.storeTODOs(newTodoItems);
    }
    /**
     * called from the delete buttons on the todo events. Removes themself from the state of the todoapp, which then saves the delete in localstorage, and updates the visible list because of react sauce.
     * @param {number} id Todo item ID
     */
    handleDeleteTodo(id) {
        // FIXME fixed?
        // TODO Necessary to check highest ID on delete? Or is it only important that they are unique?
        let todos = this.state.todoItems.slice();
        for(let i = 0; i < todos.length; i++){
            if(todos[i].id === id) {
                todos.splice(i, 1);
                break;
            }
        }
        this.setState({ todoItems: todos });
        LocalStore.storeTODOs(this.state.todoItems);
    }
    
    /**
     * Renders app based on state
     * @returns {[[Type]]} [[Description]]
     */
    render() {
        let calendar, todo, notes, calProps, todoProps;
        calProps = {
            eventItems: this.state.todoItems
        };
        todoProps = {
            todoItems: this.state.todoItems,
            highestID: this.state.highestID,
            todoSubmitCallback: this.handleTodoSubmit,
            todoDeleteCallback: this.handleDeleteTodo
        };
        
        if (this.state.navTab === 'calendar') {
            // App is in Calendar/combined mode
            if (this.state.landscapeMode) {
                // Combined calendar and todo list
                calendar = <Calendar {...calProps} />;
                todo = <TodoApp {...todoProps} />;
            } else {
                // Only calendar
                calendar = <Calendar {...calProps} />;
            }
            
        } else if (this.state.navTab === 'todo') {
            // App is in To-do mode
            todo = <TodoApp {...todoProps} />;
            
        } else if (this.state.navTab === 'notes') {
            // App is in Notes mode
            // TODO insert Notes component here
            notes = 'Here is should be notes';
        }
        
        return (
            <div className="App">
                {calendar}
                {todo}
                {notes}
            </div>
        );
    }
}

export {App as default, Header};
