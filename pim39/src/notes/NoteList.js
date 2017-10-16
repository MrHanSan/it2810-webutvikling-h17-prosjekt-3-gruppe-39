import React from 'react';

// Todo list component
const NoteList = props => (
    <div className="notelist">
        {
            props.items.map((item, index) => 
                <div className="note" key={item.id}>
                    <p className="noteTitle">{item.title}</p> 
                    <p className="noteDescription">{item.desc}</p>
                    <button onClick={() => props.onDelete(item.id)}>x</button>
                </div>)
        }
    </div>
);

export default NoteList;