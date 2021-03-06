import React, { Component } from 'react';

/**
 * Todo app new todo form
 */
class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            type: 'work',
            start: new Date(),
            end: new Date(),
        };
        
        // Bind this to event handlers
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    /**
     * Updates the current values written in the form to the state of the app
     * @param {object} event Change event object
     */
    onTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    onDescChange(event) {
        this.setState({ desc: event.target.value });
    }
    onTypeChange(event) {
        this.setState({ type: event.target.value });
    }
    onStartDateChange(event) {
        this.setState({ start: new Date(event.target.value) });
    }
    onEndDateChange(event) {
        this.setState({ end: new Date(event.target.value) });
    }
    
    /**
     * when you press the submit button, you add the todo item to the visible list, and adds it to the localstorage of you browser
     * @param {object} event Submit event object
     */
    onSubmit(event) {
        event.preventDefault();
        //input control, shouldn't make events with empty fields
        if(this.state.title === ""){
            alert("You need to add a title to your event");
            return;
        }
        
        if(new Date(this.state.start).getTime() > new Date(this.state.end).getTime()){
            alert("start date is after end date");
            return;
        }
        
        
        // Get form values from state
        let item = {
            title: this.state.title,
            desc: this.state.desc,
            type: this.state.type,
            start: this.state.start,
            end: this.state.end,
            id: this.props.todoItems.length === 0 ? 1 : this.props.highestID + 1
        };
        // Reset values for new item
        this.setState({
            title: '',
            desc: ''
        });
        
        this.props.submitCallback(event, item);
    }
    
    /**
     * React render function
     * @returns {object} React element
     */
    render() {
        return (
            <form className="TodoAppForm" onSubmit={this.onSubmit}>
                <p>Title: </p><input value={this.state.title} onChange={this.onTitleChange} /><br/>
                <p>Description</p><textarea rows="4" cols="20" value={this.state.desc} onChange={this.onDescChange} /><br/>

                <p>Type: </p><select id="typeSelector" defaultValue="other" onChange={this.onTypeChange}>
                    <option value="other" >Other</option>
                    <option value="work" >Work deadline</option>
                    <option value="meeting">Meeting</option>
                    <option value="spare time">Spare time</option>
                </select><br/>

                <p>Start date: </p>
                <input type="date" onChange={this.onStartDateChange} /><br/>
                <p>End date: </p>
                <input type="date" onChange={this.onEndDateChange} /><br/>

                <button type="submit">Save</button>
            </form>
        );
    }
}

export default TodoForm;
