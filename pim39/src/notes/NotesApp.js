import React, { Component } from 'react';
import NoteList from './NoteList.js';
import NoteForm from './NoteForm.js';
import './notes.css';

class NoteApp extends Component {
    
    getNotes() {
        var notes = this.props.noteItems;
        return notes;
    }
    
    render() {
        return(
            <div className="notesApp">
                <NoteForm 
                    submitCallback={this.props.noteSubmitCallback}
                    highestID={this.props.highestID}
                    noteItems={this.props.noteItems}
                /> 
                <NoteList 
                    items={this.props.noteItems}
                    onDelete={(this.props.noteDeleteCallback)}
                />
            </div>
        );
    }
}

export default NoteApp;
