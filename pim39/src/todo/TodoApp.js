import React, { Component } from 'react';
import TodoList from './TodoList.js';

// init when you load the page
class TodoApp extends Component {
    constructor(props) {
        super(props);
        
        // checks localStorage for TODO items, so it can load them into the todo app
        var storedTodo;
        console.log(localStorage.getItem("TODOs"));
        if(localStorage.getItem("TODOs")){
            storedTodo = JSON.parse(localStorage.getItem("TODOs"));
        }else{
            storedTodo = [];
        }
        
        
        this.state = {
            term: '',
            type: 'work',
            items: storedTodo
        };
        
            
    }
    
    
    // updates the current term written in the bar to the term attribute to the state of the app.
    onTitleChange = (event) => {
        this.setState({ term: event.target.value });
    }
    onTypeChange = (event) => {
        console.log(event.target.value);
        this.setState({ type: event.target.value });
    }
    
    
    // when you press the submit button, you add the todo item to the visible list, and adds it to the localstorage of you browser
    onSubmit = (event) => {
        event.preventDefault();
        
        // gets the selector menu object.
        /*var selector = document.getElementById("typeSelector");
        
        // creates todo item. adds to items for the react app, and localStorage in your browser so your stuff won't be lost
        var item = {
            title: this.state.term,
            type: selector.options[selector.selectedIndex].text
        }*/
        
        
        var item = {
            title: this.state.term,
            type: this.state.type
        }
        console.log(item);
        
        
        this.setState({
            term: '',
            items: [...this.state.items, item] // adds item to the visible todo list
        });
        
        // sets todoitems to localstorage, can now be extracted from other apps on the site.
        localStorage.setItem("TODOs", JSON.stringify([...this.state.items, item]));
    }
    
    // displays page
    render() {
        return(
            <div>
                <form className="TodoApp" onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onTitleChange} /><br/>
            
                    <select id="typeSelector" defaultValue="work" onChange={this.onTypeChange}>
                        <option value="work" >Work deadline</option>
                        <option value="meeting">Meeting</option>
                        <option value="spare time">Spare time</option>
                    </select><br/>
                    
                    <button>Submit</button>
                </form>
                <TodoList items={this.state.items} />
            </div>
        );
    }
}
export default TodoApp;