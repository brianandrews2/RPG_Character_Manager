import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * CreateWorldPage creates a new world for the users to build characters in
 * @returns UI for CreateWorldPage
 */
export const CreateWorldPage = () => {
    const [world_name, setWorldName] = useState(null);

    const navigate = useNavigate();

    // adds a new world to the database using a http POST request
    const addWorld = async () => {
        const newWorld = {world_name};
        const response = await fetch('/create_world', {
            method: "POST",
            body: JSON.stringify(newWorld),
            headers: {
                'Content-type':  'application/json'
            },
        });
        if(response.status === 201) {
        } else {
            alert(`Failed to add the world, status code ${response.status}`);
        }
        navigate("/worlds")
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
                        <li class="active">
                            Create World
                        </li>
                    </Link>

                </ul>
            </nav>
          </header>

        <main>
            <h1>Create a World</h1>
            <input
                type="text"
                placeholder="Enter world name"
                onChange={e => setWorldName(e.target.value)}
            />
            <button
                onClick={addWorld}
            >Create</button>
        </main>

        <footer>
            <Link to="/tutorial">Tutorial</Link>
        </footer>

      </body>
    );
}

export default CreateWorldPage
