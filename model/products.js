const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ImagePath:{
        type: String,
    },
    Title:{
        type: String,
        required: true,
    },
    Desc: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    On_Hand: {
        type: String,
        required: true,
    },
    Bestseller:{
        type: Boolean,
        default: false,
    },
    DateAdded: {
        type: Date,
        default: Date.now,
    },
});

ProductSchema.plugin(autoIncrement.plugin, 'Clothes');
module.exports = mongoose.model('Products',ProductSchema);