import React, { Component } from 'react';
import TodoList from './TodoList.js';
import './todoapp.css';

// init when you load the page
class TodoApp extends Component {
    constructor(props) {
        super(props);
        
        // checks localStorage for TODO items, so it can load them into the todo app
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
            term: '',
            desc: '',
            type: 'work',
            date: new Date(),
            highestID: highestID,
            items: storedTodo
        };
        
            
    }
    
    
    // updates the current term written in the bar to the term attribute to the state of the app.
    onTitleChange = (event) => {
        this.setState({ term: event.target.value });
    }
    
    onDescChange = (event) => {
        this.setState({ desc: event.target.value });
    }
    
    onTypeChange = (event) => {
        this.setState({ type: event.target.value });
    }
    
    onDateChange = (event) => {
        this.setState({ date: new Date(event.target.value) });
    }
    
    // called from the delete buttons on the todo events. Removes themself from the state of the todoapp, which then saves the delete in localstorage, and updates the visible list because of react sauce.
    deleteTodo = (id) => {
        var todos = this.state.items.slice();
        for(var i = 0; i < todos.length; i++){
            if(todos[i].id === id){
                todos.splice(i, 1);
                break;
            }
        }
        this.setState({ items: todos });
        localStorage.setItem("TODOs", JSON.stringify(todos));
    }
    
    
    // different getters for TODOs, based on dates. Sorts todos based on date.
    // gets the todos that have the date for today
    getTodayTodos = () =>{
        var today = new Date();
        var todos = this.state.items.filter(function (i){
            var d = new Date(i.date);
            return d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getYear() === today.getYear();
        });
        return todos;
        
        
    }
    
    // gets the todos that have the date for this week after today
    getThisWeekTodos = () =>{
        var today = new Date();
        var maxDate = (6 - today.getDay()) + today.getDate() + 1;
        var minDate = today.getDate();
        
        var todos = this.state.items.filter(function (i){
            var d = new Date(i.date);
            return d.getDate() > minDate &&
                d.getDate() <= maxDate &&
                d.getMonth() === today.getMonth() &&
                d.getYear() === today.getYear();
        });
        return todos;
    }
    
    // gets todos after this week.
    getLaterTodos = () => {
        var today = new Date();
        var minDate = (6 - today.getDay()) + today.getDate() + 1;
        
        var todos = this.state.items.filter(function (i){
            var d = new Date(i.date);
            return d.getDate() > minDate;
        });
        
        return todos;
        
    }
    
    
    
    // when you press the submit button, you add the todo item to the visible list, and adds it to the localstorage of you browser
    onSubmit = (event) => {
        event.preventDefault();
        
        var item = {
            title: this.state.term,
            desc: this.state.desc,
            type: this.state.type,
            date: this.state.date,
            id: this.state.items.length === 0 ? 1 : this.state.highestID + 1
        }
        
        
        // set ID for the new item
        
        this.setState({
            term: '',
            desc: '',
            items: [...this.state.items, item], // adds item to the visible todo list,
            highestID: this.state.highestID + 1
        });
        
        // sets todoitems to localstorage, can now be extracted from other apps on the site.
        localStorage.setItem("TODOs", JSON.stringify([...this.state.items, item]));
    }
    
    // displays page
    render() {
        return(
            <div className="todoAppCont">
                <form className="TodoAppForm" onSubmit={this.onSubmit}>
                    <p>Title: </p><input value={this.state.term} onChange={this.onTitleChange} /><br/>
                    <p>Description</p><textarea rows="4" cols="20" value={this.state.desc} onChange={this.onDescChange} /><br/>
            
                    <p>Type: </p><select id="typeSelector" defaultValue="work" onChange={this.onTypeChange}>
                        <option value="work" >Work deadline</option>
                        <option value="meeting">Meeting</option>
                        <option value="spare time">Spare time</option>
                    </select><br/>
            
                    <p>Date: </p><input type="date" onChange={this.onDateChange} /><br/>
                    
                    <button type="button">Submit</button>
                </form>
                <div className="listcont">
            
                    {/* TODO events for TODAy. */}
                    <p className="todotitle">Today:</p><br/>
                    <TodoList 
                        items={this.getTodayTodos()} 
                        onClick={this.deleteTodo}
                    />

                    {/* TODO events for this week */}
                    <p className="todotitle">Later this week:</p><br/>
                    <TodoList
                        items={this.getThisWeekTodos()} 
                        onClick={this.deleteTodo}
                    />

                    {/* All later TODOs. */}
                    <p className="todotitle">Later:</p><br/>
                    <TodoList
                        items={this.getLaterTodos()} 
                        onClick={this.deleteTodo}
                    />
                </div>
            </div>
        );
    }
}

export default TodoApp;