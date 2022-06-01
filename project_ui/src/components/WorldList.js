import React from 'react';
import World from "./World";

function WorldList({ worlds, onView, onDelete, onEdit }) {
    return (
        <table class="world_table">
            <caption>Existing Worlds</caption>
            <caption class="caption_description">Click the View icon to view the world's characters, Edit icon to update the world's name, 
            or Delete icon to delete the world and all its characters (this cannot be undone).</caption>
            <thead>
                <tr>
                    <th>World Name</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {worlds.map((world, i) => <World world={world}
                    onView={onView}
                    onDelete={onDelete}
                    onEdit={onEdit}
                key={i}/>)}
            </tbody>
        </table>
    )
}

export default WorldList;