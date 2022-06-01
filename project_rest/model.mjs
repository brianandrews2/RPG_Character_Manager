import mongoose from 'mongoose';
import { Character } from "./schemas/character_schema.mjs"
import { World } from "./schemas/world_schema.mjs"
import { Item } from "./schemas/item_schema.mjs"

//// Set up MongoDB and Mongoose ////
mongoose.connect(
    "mongodb://localhost:27017/rpg_db",
    { useNewUrlParser: true}
);
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDB using Mongoose!");
});

//################### WORLD CRUD ###################

/**
 * Create a new world with no characters
 * @param {String} world_name
 * @returns a promised JSON object of the new world.
 */
const createWorld = async (world_name) => {
    const world = await World.create({
        world_name: world_name
    })
    return world.save();
}

/**
 * Find a world and its characters based on query parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns a promised JSON containing the queried world's characters
 */
 const findWorldCharacters = async (filter) => {
    const world = World.find( { _id: filter })
    const results = await world.exec();
    const characters = Character.find({ homeworld_id: filter })
    return characters;
}

/**
 * Find all worlds
 * @returns a json promis of all worlds
 */
const findAllWorlds = async() => {
    const results = World.find()
    return results;
}

/**
 * Delete World, including all characters and all items owned by those characters
 * @param {String} _id 
 * @returns deleted count
 */
const deleteWorld = async (_id) => { 
    // Find world to delete
    const world = await World.findById(_id);

    // Delete all characters in that world
    for (let char in world.characters) {
        let character = world.characters[char]
        await Character.deleteOne({ _id: character._id });

        // Delete all items owned by the characters
        for (let item in character.character_inventory) {
            let inventory_item = character.character_inventory[item]
            await Item.deleteOne({ _id: inventory_item._id });
        }
    }
    // Delete World
    const world_deleted = await World.deleteOne({ _id: _id });
    return world_deleted.deletedCount;
}


/**
 * Update World
 * @param {String} _id
 * @param {String} world_name
 * @returns 
 */
const updateWorld = async (_id, world_name) => {
    const result = await World.updateOne({ _id: _id },
        { world_name: world_name });
    return result.modifiedCount;
}



//################### CHARACTER CRUD ###################

/**
 * Create a character and add to world
 * @param {String} world_id
 * @param {String} character_name
 * @returns a promised JSON object of the world with a character added.
 */
 const createCharacter = async (world_name, character_name) => {
    const worldbyname = await World.find({ world_name: world_name })
    const homeworld = worldbyname[0];
    const homeworld_name = homeworld.world_name;
    const new_character = await Character.create({ character_name: character_name, homeworld_id: homeworld._id, homeworld_name: homeworld_name });
    homeworld.characters.push(new_character);
    return homeworld.save();
}


/**
 * Create a DEFAULT character and add to world
 * @param {String} world_id
 * @param {String} character_name
 * @returns a promised JSON object of the world with a character added.
 */
 const createDefaultCharacter = async (world_name, character_name) => {
    const worldbyname = await World.find({ world_name: world_name })
    const homeworld = worldbyname[0];
    const homeworld_name = homeworld.world_name;
    const new_character = await Character.create({ character_name: character_name, homeworld_id: homeworld._id, homeworld_name: homeworld_name,
        strength:  5, intellect: 5, agility: 5, money: 10 });
    homeworld.characters.push(new_character);
    const new_character_id = new_character._id;

    //create new item object for ITEM 1
    const new_item_1 = await Item.create({ owner_id: new_character_id, item_name: "Sword", value: 10 })

    //create new item object for ITEM 2
    const new_item_2 = await Item.create({ owner_id: new_character_id, item_name: "Shield", value: 10 })

    //find homeworlds character
    const character_to_update = homeworld.characters.id(new_character_id);

    //add item to character
    character_to_update.character_inventory.push(new_item_1);
    character_to_update.character_inventory.push(new_item_2);
    return homeworld.save();
}

/**
 * Update Character
 * @param {String} _id
 * @param {String} character_name
 * @returns 
 */
 const updateCharacter = async (_id, character_name, strength, agility, intellect, gold, level) => {
    const result = await Character.updateOne({ _id: _id },
        { character_name: character_name, strength: strength, agility: agility, intellect: intellect, money: gold, level: level });
    return result.modifiedCount;
}

/**
 * Find a single character based on query parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns a promised JSON containing the queried world
 */
const findCharacter = async (filter) => {
    const query = Character.find({ _id: filter });
    await query.exec();
    const items = Item.find({ owner_id: filter })

    return items;
}

/**
 * Delete Character - deletes a character and all items they own
 * @param {String} _id 
 * @returns deleted count
 */
 const deleteCharacter = async (character_id) => { 
    // Find root homeworld for specified character
    const character_to_delete = await Character.findById(character_id);
    const homeworld_id = character_to_delete.homeworld_id;
    const world = await World.findById(homeworld_id);
    
    // Find homeworld's character
    const character = world.characters.id(character_id);

    // Delete all items owned by the character from the item collection
    for (let item in character.character_inventory) {
        let inventory_item = character.character_inventory[item]
        await Item.deleteOne({ _id: inventory_item._id });
    }
    // Delete Character from character collection
    const character_deleted = await Character.deleteOne({ _id: character_id });

    // Delete character from world
    world.characters.id(character_id).remove();
    await world.save();
    return character_deleted.deletedCount;
}


//################### ITEM CRUD ###################

/**
 * Create an item to add to a character's inventory
 * @param {String} character_id 
 * @param {Object} item 
 */
const addItem = async (owner_id, item_name, value) => {
    //find root character and homeworld for item
    const character = await Character.find({ _id: owner_id });
    const char_id = character[0]._id;
    const homeworld_id = character[0].homeworld_id;
    const world = await World.findById(homeworld_id);

    //create new item object
    const new_item = await Item.create({ owner_id: char_id, item_name: item_name, value: value })

    //find homeworlds character
    const character_to_update = world.characters.id(char_id);

    //add item to character
    character_to_update.character_inventory.push(new_item);
 
    return world.save();
 }

 /**
  * Find item from item_id
  * @param {String} item_id 
  * @returns item object
  */
 const findItem = async (filter, projection, limit) => {
    const query = Item.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
 }

/**
 * Delete Item - deletes a character's items
 * @param {String} _id 
 * @returns deleted count
 */
 const deleteItem = async (item_id) => { 
    // Find item's owner Character
    const item_to_delete = await Item.findById(item_id);
    const owner_id = item_to_delete.owner_id;
    const owner = await Character.findById(owner_id);

    // Find root world for owner
    const homeworld_id = owner.homeworld_id;
    const homeworld = await World.findById(homeworld_id);

    // Delete item from character by traversing down from world > character > item
    const homeworld_character = homeworld.characters.id(owner_id);
    const character_item = homeworld_character.character_inventory.id(item_id);
    character_item.remove();

    // Delete item from the item collection
    const item_deleted = await Item.deleteOne({ _id: item_id });
    await homeworld.save();
    return item_deleted.deletedCount;
}

/**
 * Sell Item - sells a character's items and adds that gold to their total money
 * @param {String} _id 
 * @returns deleted count
 */
 const sellItem = async (item_id, money, char_id) => { 

    // Find item's owner Character
    const item_to_delete = await Item.findById(item_id);
    const owner_id = item_to_delete.owner_id;
    const value = item_to_delete.value;
    const owner = await Character.findById(owner_id);
    const new_money_count = money+value;

    //Update characters money after sale
    await Character.updateOne({_id: char_id},
        {character_name: owner.character_name, strength: owner.strength, agility: owner.agility, intellect: owner.intellect, money: new_money_count })

    // Find root world for owner
    const homeworld_id = owner.homeworld_id;
    const homeworld = await World.findById(homeworld_id);

    // Delete item from character by traversing down from world > character > item
    const homeworld_character = homeworld.characters.id(owner_id);
    const character_item = homeworld_character.character_inventory.id(item_id);
    character_item.remove();

    // Delete item from the item collection
    const item_deleted = await Item.deleteOne({ _id: item_id });
    await homeworld.save();
    return item_deleted.deletedCount;
}

export { createWorld, findWorldCharacters, findAllWorlds, updateWorld, deleteWorld, createCharacter, createDefaultCharacter, 
         updateCharacter, findCharacter, deleteCharacter, addItem, sellItem, findItem, deleteItem };