import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

function Item({ item, onDelete }) {
    return (
        <tr>
            <td>{item.item_name}</td>
            <td>{item.value}</td>
            <td><TiDeleteOutline onClick = { () => onDelete(item) } /></td>
        </tr>
    )
}

export default Item;