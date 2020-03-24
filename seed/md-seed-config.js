const mongoose = require('mongoose');
const Clothes = require('../model/clothes');

const mongoURL = process.env.URI;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
    Clothes,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () => await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();