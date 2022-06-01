import mongoose from 'mongoose';
import { characterSchema } from './character_schema.mjs';

/**
 * World Schema
 */
 const worldSchema = mongoose.Schema({
    world_name: { type: String, required: true },
    characters: [characterSchema]
});
const World = mongoose.model("World", worldSchema);


export { World, worldSchema }