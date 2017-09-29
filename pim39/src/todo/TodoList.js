import React from 'react';

const List = props => (
    <ul>
        {
            props.items.map((item, index) => <li key={index}>{item.title}: {item.type}</li>)
        }
    </ul>
);

export default List;