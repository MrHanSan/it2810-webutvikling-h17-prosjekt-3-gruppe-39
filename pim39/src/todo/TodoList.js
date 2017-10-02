import React from 'react';

const TodoList = props => (
    <ul>
        {
            props.items.map((item, index) => <li key={item.id}>{item.title}: {item.type} <button onClick={() => props.onClick(item.id)}>x</button></li>)
        }
    </ul>
);

export default TodoList;
/*var TodoList = React.createClass({
    render: function(){
        return(
            <ul>
                {
                    this.props.items.map((item, index) => <li key={item.id}>{item.title}: {item.type} <button onClick={this.props.onClick()}>x</button></li>)
                }
            </ul>
        );
    }
});

export default TodoList;*/