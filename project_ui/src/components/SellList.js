import React from 'react';
import SellItem from './SellItem';

function SellList({ items, onSell }) {
    return (
        <table class="item_table">
            <caption>Items</caption>
            <caption class="caption_description">Click the the Sell icon to sell the item to the merchant and add its 
            value to your current gold (merchant does not buy items back so this cannot be undone).</caption>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Value</th>
                    <th>Sell</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => <SellItem item={item}
                onSell={onSell}
                key={i}/>)}
            </tbody>
        </table>
    )
}

export default SellList;