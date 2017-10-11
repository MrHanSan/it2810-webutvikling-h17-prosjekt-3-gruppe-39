import React, { Component } from 'react';
import TodoList from './TodoList.js';
import TodoForm from './TodoForm.js';
import './todoapp.css';

// init when you load the page
class TodoApp extends Component {
    constructor(props) {
        super(props);
        
        // TODO should not have state? remove constructor
//        this.state = {
//            highestID: highestID,
//            items: storedTodo
//        };
    }
    
    // TODO Needed props:
    //Todo item list
    //delete todo
    //handle submit to form
    //highest ID?
    
    
    // different getters for TODOs, based on dates. Sorts todos based on date.
    /**
     * gets the todos that have the date for today
     * @returns {Array} Todo items
     */
    getTodayTodos() {
        // TODO get from props
        var today = new Date();
        var todos = this.props.todoItems.filter(function (i){
            var d = new Date(i.end);
            return d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getYear() === today.getYear();
        });
        return todos;
    }
    /**
     * gets the todos that have the date for this week after today
     * @returns {Array} Todo items
     */
    getThisWeekTodos() {
        // TODO get from props
        var today = new Date();
        var maxDate = (6 - today.getDay()) + today.getDate() + 1;
        var minDate = today.getDate();
        
        var todos = this.props.todoItems.filter(function (i){
            var d = new Date(i.end);
            return d.getDate() > minDate &&
                d.getDate() <= maxDate &&
                d.getMonth() === today.getMonth() &&
                d.getYear() === today.getYear();
        });
        return todos;
    }
    /**
     * Gets todos after this week.
     * @returns {Array} Todo items
     */
    getLaterTodos() {
        // TODO get from props
        var today = new Date();
        var minDate = (6 - today.getDay()) + today.getDate() + 1;
        
        var todos = this.props.todoItems.filter(function (i){
            var d = new Date(i.end);
            return d.getDate() > minDate;
        });
        return todos;
    }
    
    /**
     * Displays page
     */
    render() {
        return(
            <div className="todoAppCont">
                <TodoForm 
                    submitCallback={this.props.todoSubmitCallback}
                    highestID={this.props.highestID}
                    todoItems={this.props.todoItems}
                    />
                <div className="listcont">
            
                    {/* TODO events for TODAy. */}
                    <p className="todotitle">Today:</p><br/>
                    <TodoList 
                        items={this.getTodayTodos()} 
                        onClick={this.props.todoDeleteCallback}
                    />

                    {/* TODO events for this week */}
                    <p className="todotitle">Later this week:</p><br/>
                    <TodoList
                        items={this.getThisWeekTodos()} 
                        onClick={this.props.todoDeleteCallback}
                    />

                    {/* All later TODOs. */}
                    <p className="todotitle">Later:</p><br/>
                    <TodoList
                        items={this.getLaterTodos()} 
                        onClick={this.props.todoDeleteCallback}
                    />
                </div>
            </div>
        );
    }
}

export default TodoApp;
