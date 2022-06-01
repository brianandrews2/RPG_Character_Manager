import React from 'react';
import { GrMoney } from 'react-icons/gr';

function SellItem({ item, onSell }) {
    return (
        <tr>
            <td>{item.item_name}</td>
            <td>{item.value}</td>
            <td><GrMoney onClick = { () => onSell(item) } /></td>
        </tr>
    )
}

export default SellItem;