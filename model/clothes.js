const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const ClothesSchema = new Schema({
    ImagePath:{
        type: String,
        required: true,
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
    DateAdded: {
        type: Date,
        default: Date.now,
    },
});

ClothesSchema.plugin(autoIncrement.plugin, 'Clothes');
module.exports = mongoose.model('Clothes',ClothesSchema);