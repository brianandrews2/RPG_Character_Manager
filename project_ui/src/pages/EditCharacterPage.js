import React from 'react';
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

/**
 * EditCharacterPage has the fields that the user can enter to update the characters stats and name
 * @param {object} characterToView
 * @returns UI for EditCharacterPage
 */
export const EditCharacterPage = ({ characterToView }) => {
    const [character_name, setNewCharacterName] = useState(characterToView.character_name)
    const [strength, setStrength] = useState(characterToView.strength);
    const [agility, setAgility] = useState(characterToView.agility);
    const [intellect, setIntellect] = useState(characterToView.intellect);
    const [gold, setGold] = useState(characterToView.money);
    const [level, setLevel] = useState(characterToView.level);

    const navigate = useNavigate();

    /// updates the character using http PUT request
    const editCharacter = async () => {
        const editedCharacter = { character_name, strength, agility, intellect, gold, level };
        await fetch(`/worlds/characters/update_character/${characterToView._id}`, {
            method: "PUT",
            body: JSON.stringify(editedCharacter),
            headers: {
                'Content-type':  'application/json'
            },
        });

        navigate("/worlds/characters");
    }

    return (
        <body>
            <header>
                <h1 class="page_header">RPG Character Manager</h1>
                    <nav>
                    <ul>
                        <Link to="/">
                            <li>
                                Home
                            </li>
                        </Link>

                        <Link to="/worlds">
                            <li>
                                Worlds
                            </li>
                        </Link>


                        <Link to="/create_world">
                            <li>
                                Create World
                            </li>
                        </Link>


                        <Link to="/worlds/characters">
                            <li>
                                Characters
                            </li>
                        </Link>


                        <button class="back_button" onClick={() => navigate(-1)}>
                            <li>
                                Character Sheet
                            </li>
                        </button>

                        <Link to="/worlds/characters/add_item">
                            <li>
                                Create Item
                            </li>
                        </Link>
    
                        <Link to="/worlds/characters/update_character">
                                <li class="active">
                                Update Character
                            </li>   
                        </Link>

                    </ul>
                </nav>
            </header>

            <main>
                <h1>Edit {characterToView.character_name}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name
                            </td>
                            <td>
                                <input
                                type="text"
                                placeholder="Enter new name here"
                                value={character_name}
                                onChange={e => setNewCharacterName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Level
                            </td>
                            <td>
                                <input
                                type="number"
                                placeholder="Enter level here"
                                value={level}
                                onChange={e => setLevel(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Strength
                            </td>
                            <td>
                                <input
                                type="number"
                                placeholder="Enter strength here"
                                value={strength}
                                onChange={e => setStrength(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Agility
                            </td>
                            <td>
                                <input
                                type="number"
                                placeholder="Enter agility here"
                                value={agility}
                                onChange={e => setAgility(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Intellect
                            </td>
                            <td>
                                <input
                                type="number"
                                placeholder="Enter intellect here"
                                value={intellect}
                                onChange={e => setIntellect(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gold
                            </td>
                            <td>
                                <input
                                type="number"
                                placeholder="Enter gold here"
                                value={gold}
                                onChange={e => setGold(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                onClick={editCharacter}
                >Save</button>
            </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>

        </body>

    )
}

export default EditCharacterPage;
