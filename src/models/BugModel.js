const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Model for a bug
 * @param {String} id ID of the bug (UUID)
 * @param {String} contact Contact information of the user (discord or email)
 * @param {String} title Title of the bug
 * @param {String} model Model of the car
 * @param {String} description Description of the bug
 * @param {Boolean} resolved Whether the bug has been resolved or not
 */
const bugSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    contact: String,
    title: String,
    model: String,
    description: String,
    resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bug', bugSchema);