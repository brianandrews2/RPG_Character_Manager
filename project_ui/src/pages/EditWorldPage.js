import React from 'react';
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

/**
 * EditWorldPage has the input fields that the user can enter to edit the world's name
 * @param {object} worldToEdit
 * @returns UI for EditWorldPage
 */
export const EditWorldPage = ({ worldToEdit }) => {
    const [world_name, setWorldName] = useState(worldToEdit.world_name)

    const navigate = useNavigate();

    // updates the world name using http PUT request
    const editWorld = async () => {
        const editedWorld = { world_name };
        await fetch(`/worlds/update_world/${worldToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify(editedWorld),
            headers: {
                'Content-type':  'application/json'
            },
        });

        navigate(-1);
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
                        
                        <li class="active_inactive_link">
                            <span>Edit World</span>
                        </li>

                        
                    </ul>
                </nav>
            </header>

            <main>
                <h1>Edit {worldToEdit.world_name}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                New World Name
                            </td>
                            <td>
                                <input
                                type="text"
                                placeholder="Enter new name here"
                                value={world_name}
                                onChange={e => setWorldName(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                onClick={editWorld}
                >Save</button>
            </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>

        </body>

    )
}

export default EditWorldPage;
