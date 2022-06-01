import React from 'react';
import { Link } from 'react-router-dom';
import SellList from '../components/SellList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
/**
 * MerchantPage contains a list of the previously selected character's items.  The user can click the sell icon next to each item to delete the item 
 * and add its value of money to the total money of that character.
 * @param {object} characterToView
 * @returns UI for MerchantPage
 */
function MerchantPage ({ characterToView }){
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    // populates the list of items that the character owns
    const loadItems = async () => {
        const selectedCharacter = await characterToView;
        const response = await fetch(`/worlds/characters/character_sheet?_id=${ selectedCharacter._id }`);
        const data = await response.json();
        setItems(data);
    }

    // deletes the item and adds the value to the character's gold using a http PUT request
    const onSell = async item => {
        const money = characterToView.money;
        const _id = characterToView._id
        const charToUpdateMoney = { money, _id }
        const response = await fetch(`/worlds/merchant/${item._id}/`, {
        method: "PUT",
        body: JSON.stringify(charToUpdateMoney),
        headers: {
            'Content-type': 'application/json'
        },
        });
        if (response.status === 204) {
          const remaining_items =  items.filter(i => i._id !== item._id);
          setItems(remaining_items);
        } else {
          console.error(`Failed to delete item with _id = ${item._id}, status code = ${response.status}`)
        }
        navigate("/worlds/characters")
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

                <button class="back_button" onClick={() => navigate(-1)}>
                  <li>
                    Character Sheet
                  </li>
                </button>

                <Link to="/worlds/merchant">
                  <li class="active">
                    Merchant
                  </li>
                </Link>

              </ul>
            </nav>
          </header>

          <main>
            <h1>Sell {characterToView.character_name}'s Items</h1>
            <SellList items={items} onSell={onSell}></SellList>
          </main>

          <footer>
            <Link to="/tutorial">Tutorial</Link>
          </footer>

        </body>

    )
}
 
export default MerchantPage;
