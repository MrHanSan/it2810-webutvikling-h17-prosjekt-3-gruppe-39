import React from 'react';

const TodoList = props => (
    <ul className="todolist">
        {
            props.items.map((item, index) => 
                <li className="todoitem" key={item.id}>
                    <p className="itemTitle">{item.title}: {item.type}</p> 
                    <p className="itemDeadline">Deadline: <span>{new Date(item.end).toLocaleDateString()}</span></p>
                    <button onClick={() => props.onClick(item.id)}>x</button>
                </li>)
        }
    </ul>
);

export default TodoList;
