const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const connect = mongoose.createConnection(process.env.URI);
autoIncrement.initialize(connect);

const UserSchema = new Schema({
    _id:{
        type: Number,
        required: true,
    },
    FirstName:{
        type: String,
        required:true,
    },
    LastName:{
        type: String,
        required:true,
    },
    Email:{
        type: String,
        required:true,
    },
    Username:{
        type: String,
        required:true,
    },
    Psw:{
        type:String,
        required:true,
    },
    Gender:{
        type: String,
        required:true,
    },
    Date:  {
        type: Date,
        default: Date.now
    },
    Employee:  {
        type: Boolean,
        default: false,
    },
});

UserSchema.plugin(autoIncrement.plugin, 'Users')
// exporting the module
module.exports = connect.model('Users',UserSchema);