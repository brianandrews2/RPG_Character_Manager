import mongoose from 'mongoose';

/**
 * Item Schema
 */
 const itemSchema = mongoose.Schema({
    item_name: { type: String, required: true },
    value: { type: Number, required: true },
    owner_id: { type: String, required: true },
})
const Item = mongoose.model("Item", itemSchema);

export { Item, itemSchema }