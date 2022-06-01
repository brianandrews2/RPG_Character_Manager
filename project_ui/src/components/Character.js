import React from 'react';
import { GrOverview } from "react-icons/gr";
import { TiDeleteOutline } from 'react-icons/ti';

function Character({ character, onView, onDelete, onEdit }) {
    return (
        <tr>
            <td>{character.character_name}</td>
            <td><GrOverview onClick = { () => onView(character) }/></td>
            <td><TiDeleteOutline onClick = { () => onDelete(character) } /></td>
        </tr>
    )
}

export default Character;