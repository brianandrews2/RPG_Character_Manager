import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * CreateItemPage creates a new item for a previously selected character
 * @param {object} characterToView
 * @returns UI for CreateItemPage
 */
export const CreateItemPage = ({ characterToView }) => {
    const [item_name, setItemName] = useState(null);
    const [value, setValue] = useState(null);
    const navigate = useNavigate();

    // adds a new item using a POST http request
    const addItem = async () => {
        const _id = characterToView._id;
        const newItem = { _id, item_name, value };
        const response = await fetch('/worlds/characters/add_item', {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if(response.status === 201) {
        } else {
            alert(`Failed to add the item, status code ${response.status}`);
        }
        navigate(-1)

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
                        
                            <button class="back_button" onClick={() => navigate(-1)}>
                                <li>
                                    Character Sheet
                                </li>
                            </button>

                            <li class="active_inactive_link">
                                <span>Create Item</span>
                            </li>
                        </ul>
                    </nav>
            </header>

            <main>
                <h1>Create an Item for {characterToView.character_name}</h1>
                <input
                    type="text"
                    placeholder="Enter item name"
                    onChange={e => setItemName(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Enter item value"
                    onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={addItem}>Create</button>
            </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>

      </body>
    )
}

export default CreateItemPage
