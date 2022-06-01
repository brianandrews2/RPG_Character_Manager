import React from 'react';
import Character from "./Character";

function CharacterList({ characters, onView, onDelete, onEdit }) {
    return (
        <table class="character_list">
            <caption>Characters</caption>
            <caption class="caption_description">Click the View icon to view the character stats and inventory, 
            or the Delete icon to delete the character and all its items (this cannot be undone).</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {characters.map((character, i) => <Character character={character}
                    onView={onView}
                    onDelete={onDelete}
                key={i}/>)}
            </tbody>
        </table>
    )
}

export default CharacterList;