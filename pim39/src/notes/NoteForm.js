import React, { Component } from 'react';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: ''
        };
        
        // Bind this to event handlers
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
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
    
    /**
     * when you press the submit button, you add the todo item to the visible list, and adds it to the localstorage of you browser
     * @param {object} event Submit event object
     */
    onSubmit(event) {
        event.preventDefault();
        // Get form values from state
        let item = {
            title: this.state.title,
            desc: this.state.desc,
            id: this.props.noteItems.length === 0 ? 1 : this.props.highestID + 1
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
            <form className="noteForm" onSubmit={this.onSubmit}>
                <p>Title: </p><input value={this.state.title} onChange={this.onTitleChange} /><br/>
                <p>Description</p><textarea rows="4" cols="20" value={this.state.desc} onChange={this.onDescChange} /><br/>

                <button type="submit">Save</button>
            </form>
        );
    }
}

export default NoteForm;
