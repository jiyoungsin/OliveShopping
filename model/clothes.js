const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const autoIncrement = require('mongoose-auto-increment');
//const uniqueValidator = require('mongoose-unique-validator');

const connect = mongoose.createConnection(process.env.URI);

const ClothesSchema = new Schema({
    ImagePath:{
        type: String,
        default: "No Name",
    },
    ImagePath:{
        type: String,
        default: "No Name",
    },
    Desc: {
        type: String,
        default: "No Description",
    },
    Price: {
        type: Number,
        required: true,
    },
    DateAdded: {
        type: Date,
        default: Date.now,
    },
});

//  change users to the const variable name.
//ClothesSchema.plugin(autoIncrement.plugin, 'Users');

// exporting the module
module.exports = connect.model('Clothes',ClothesSchema);