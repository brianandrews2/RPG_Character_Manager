import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from "../components/ItemList";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CharacterSheetPage displays the character sheet for the previously selected character with features to select their items and update the character
 * @param {object} characterToView
 * @param {object} worldToView 
 * @returns UI for the CharacterSheetPage
 */
function CharacterSheetPage({ characterToView, worldToView }) {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    // deletes a character with a http request
    const onDelete = async item => {
      const response = await fetch(`/worlds/characters/character_sheet/${item._id}`, {method: "DELETE"});
      if (response.status === 204) {
        const remaining_items =  items.filter(i => i._id !== item._id);
        setItems(remaining_items);
      } else {
        console.error(`Failed to delete item with _id = ${item._id}, status code = ${response.status}`)
      }
    }

    // populates the inventory table of the character
    const loadItems = async () => {
        const selectedCharacter = await characterToView;
        const response = await fetch(`/worlds/characters/character_sheet?_id=${ selectedCharacter._id }`);
        const data = await response.json();
        setItems(data);
    }

    useEffect(() => {
      loadItems();
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


                <button class="back_button" onClick={() => navigate(-1)}>
                  <li>
                    Characters
                  </li>
                </button>

              <li class="active_inactive_link">
                <span>Character Sheet</span>
              </li>


                <Link to="/worlds/characters/add_item">
                  <li>
                    Create Item
                  </li>
                </Link>


                <Link to="/worlds/characters/update_character">
                  <li>
                    Update Character
                  </li>
                </Link>


                <Link to="/worlds/merchant">
                  <li>
                    Merchant
                  </li>
                </Link>

            </ul>
          </nav>
        </header>

        <main>
          <h1 class="character_name">{characterToView.character_name } of {worldToView.world_name}</h1> 
          <h2>Level { characterToView.level }</h2>
            <table class="stat_table">
              <caption>Stats</caption>
              <tbody>
                <tr>
                  <td>
                    Strength:
                  </td>
                  <td>
                    {characterToView.strength}
                  </td>
                </tr>
                <tr>
                  <td>
                    Agility:
                  </td>
                  <td>
                    {characterToView.agility}
                  </td>
                </tr>
                <tr>
                  <td>
                    Intellect:
                  </td>
                  <td>
                    {characterToView.intellect}
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="gold_table">
              <tbody>
                <tr>
                  <td>
                    Gold:
                  </td>
                  <td>
                    {characterToView.money}
                  </td>
                </tr>
              </tbody>            
            </table>
            <Link class="main_link" to="/worlds/characters/update_character">Update Character</Link>
            <span class="button_description">- update character's name, stats or gold then return to the character list page.</span>
          <br></br>
          
          <ItemList items={items} onDelete={onDelete}></ItemList>
          <Link class="main_link" to="/worlds/characters/add_item">Create Item</Link>
          <span class="button_description">- create a new item with a name and value of your choice, then return to this page.</span>
        </main>
        <footer>
          <Link to="/tutorial">Tutorial</Link>
        </footer>
        

        
      </body>

    );
  }

export default CharacterSheetPage
