import mongoose from 'mongoose';
import { itemSchema } from './item_schema.mjs'

/**
 * Character Schema
 */
 const characterSchema = mongoose.Schema({
    character_name: { type: String, required: true },
    character_inventory: [itemSchema],
    homeworld_id: String,
    money: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    agility: { type: Number, default: 0 },
    intellect: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
});
const Character = mongoose.model("Character", characterSchema);

export { Character, characterSchema }