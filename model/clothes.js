const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const autoIncrement = require('mongoose-auto-increment');
//const uniqueValidator = require('mongoose-unique-validator');

const connect = mongoose.createConnection(process.env.URI);

const ClothesSchema = new Schema({
    ImagePath:{
        type: String,
        default: "#",
    },
    Title:{
        type: String,
        default: "No Name",
    },
    Desc: {
        type: String,
        default: "No Description",
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

module.exports = connect.model('Clothes',ClothesSchema);