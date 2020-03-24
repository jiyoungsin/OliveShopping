const mongoose = require('mongoose');
const Clothes = require('./seed/clothing-seeder');
require("dotenv").config({path:'./config/keys.env'});

const mongoURL = "mongodb+srv://PaulSin:Apple123@cluster0-s7zzt.mongodb.net/test?retryWrites=true&w=majority";
console.log("asdfasdfasdfasdf");
/**
 * Seeders List
 * order is important
 * @type {Object}
 */

const seedersList = {
    Clothes,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
//const connect = async () => await mongoose.createConnection(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
const connect = async () => await mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList,
  connect,
  dropdb,
}