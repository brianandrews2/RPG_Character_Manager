import React from 'react';
import Item from './Item';

function ItemList({ items, onDelete }) {
    return (
        <table class="item_table">
            <caption>Items</caption>
            <caption class="caption_description">Click the the Delete icon to delete the item (this does not sell the item for gold, and this cannot be undone).</caption>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Value</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => <Item item={item}
                onDelete={onDelete}
                key={i}/>)}
            </tbody>
        </table>
    )
}

export default ItemList;