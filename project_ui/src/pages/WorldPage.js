import React from 'react';
import { Link } from 'react-router-dom';
import WorldList from "../components/WorldList"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * WorldPage contains the list of worlds that the user can view or edit
 * @param {object} setWorldToView
 * @param {object} setWorldToEdit
 * @returns UI for WorldPage
 */
function WorldPage( { setWorldToView, setWorldToEdit }) {
    const [worlds, setWorlds] = useState([]);
    const navigate = useNavigate();

    // selecting edit takes the user to the update_world page to edit the world's name
    const onEdit = world => {
      setWorldToEdit(world);
      navigate("/worlds/update_world");
    }

    // selecting view takes the user to that world's page to view its characters
    const onView = world => {
      setWorldToView(world);
      navigate("/worlds/characters")
    }

    // selecting delete will permanently delete the world and all its characters/items using a DELETE http request
    const onDelete = async world => {
      const response = await fetch(`/worlds/${world._id}`, {method: 'DELETE'});
      if(response.status === 204) {
        const remaining_worlds = worlds.filter(w => w._id !== world._id);
        setWorlds(remaining_worlds);
      } else {
        console.error(`Failed to delete world with _id = ${world._id}, status code = ${response.status}`);
      }
    }

    // loads the table list of all worlds
    const loadWorlds = async () => {
      const response = await fetch('/worlds');
      const data = await response.json();
      setWorlds(data);
    }

    useEffect(() => {
      loadWorlds();
    }, []);

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
                  <li class="active">
                    Worlds
                  </li>
                </Link>


                <Link to="/create_world">
                  <li>
                    Create World
                  </li>
                </Link>
            </ul>
          </nav>
        </header>
        <main>
          <WorldList worlds={worlds} onView={onView} onDelete={onDelete} onEdit={onEdit}></WorldList>
          <br></br>
          <Link class="main_link" to="/create_world">Create World</Link>
{/*           <h3>Add World</h3>
          <input
              type="text"
              placeholder="Enter world name here"
              value={world_name}
              onChange={e => setWorldName(e.target.value)} />
          <button
              onClick={addWorld}
          >Add</button> */}
        </main>

        <footer>
          <Link to="/tutorial">Tutorial</Link>
        </footer>
      </body>
    );
  }

export default WorldPage
