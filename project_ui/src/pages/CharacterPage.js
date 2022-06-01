import React from 'react';
import { Link } from 'react-router-dom';
import CharacterList from "../components/CharacterList"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CharacterPage displays the list of characters existing in the previously selected world.
 * @param {object} worldToView
 * @param {object} setCharacterToView
 * @returns UI containing the list of characters
 */
function CharacterPage({ worldToView, setCharacterToView }) {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    // navigate to selected character sheet page
    const onView = character => {
      setCharacterToView(character);
      navigate("/worlds/characters/character_sheet")
    }

    // deletes character with delete http request
    const onDelete = async character => {
      console.log(character)
      const response = await fetch(`/worlds/characters/${character._id}`, {method: 'DELETE'});
      if (response.status === 204) {
        const remaining_characters = characters.filter(c => c._id !== character._id);
        setCharacters(remaining_characters);
      } else{
        console.error(`Failed to delete character with _id = ${character._id}, status code = ${response.status}`)
      }
    }

    // populates the table list of characters
    const loadCharacters = async () => {
      const selectedWorld = await worldToView;
      const response = await fetch(`/worlds/characters?_id=${ selectedWorld._id }`);
      const data = await response.json();
      setCharacters(data);
    }

    useEffect(() => {
      loadCharacters();
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
                <span>Characters</span>
              </li>

                <Link to="/worlds/characters/create_character">
                  <li>
                    Create Character
                  </li>
                </Link>

            </ul>
          </nav>
        </header>

        <main>
          <h1 class="character_name">{ worldToView.world_name }</h1>
          <CharacterList characters={characters} onView={onView} onDelete={onDelete}></CharacterList>
          <br></br>
          <Link class="main_link" to="/worlds/characters/create_character">
              Create New Character
          </Link>
          <span class="button_description">- Create a new character of {worldToView.world_name}.  All stats, gold and items will need to be set up.</span>
          <br></br>
          <br></br>
          <Link class="main_link" to="/worlds/characters/create_default_character">
              Create Default Character
          </Link>
          <span class="button_description">- Start right away!  Create a pre-filled out character of {worldToView.world_name} with default items, stats and gold.</span>

        </main>

        <footer>
          <Link to="/tutorial">Tutorial</Link>
        </footer>

      </body>
    );
  }

export default CharacterPage
