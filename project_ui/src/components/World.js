import React from 'react';
import { GrOverview } from "react-icons/gr";
import { TiDeleteOutline } from 'react-icons/ti';
import { GrFormEdit } from 'react-icons/gr';

function World({ world, onView, onDelete, onEdit }) {
    return (
        <tr>
            <td>{world.world_name}</td>
            <td><GrOverview onClick = { () => onView(world) }/></td>
            <td><GrFormEdit onClick = { () => onEdit(world) } /></td>
            <td><TiDeleteOutline onClick = { () => onDelete(world) } /></td>

        </tr>
    )
}

export default World;