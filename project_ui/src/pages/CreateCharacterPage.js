import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * CreateCharacterPage creates a new character in the previously selected world
 * @param {object} worldToView
 * @returns UI for the CreateCharacterPage
 */
export const CreateCharacterPage = ({ worldToView }) => {
    const [character_name, setCharacterName] = useState(null);
    //const [world_name, setHomeworldName] = useState(null);
    const navigate = useNavigate();

    // adds a character to the world with a POST http request
    const addCharacter = async () => {
        const world_name = worldToView.world_name
        const newCharacter = { world_name, character_name };
        const response = await fetch('/worlds/characters/create_character', {
            method: "POST",
            body: JSON.stringify(newCharacter),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if(response.status === 201) {
        } else {
            alert(`Failed to add the character, status code ${response.status}`);
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
                                    Characters
                                </li>  
                            </button>

                        <li class="active_inactive_link">
                            <span>Create Character</span>
                        </li>
 
                    </ul>
                </nav>
            </header>

            <main>
                <h1>Create a Character of {worldToView.world_name}</h1>
                    <input
                        type="text"
                        placeholder="Enter character name"
                        onChange={e => setCharacterName(e.target.value)}/>
                    <button onClick={addCharacter}>Create</button>
            </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>

        </body>



    )
}

export default CreateCharacterPage
