const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Model for a contributor
 * @param {String} id ID of the contributor (UUID)
 * @param {String} email Email of the contributor
 * @param {String} name Name of the contributor
 * @param {String} description Description of the contributors work
 * @param {String} role Role of the contributor at htw (student, professor, ...)
 * @param {String} linkedIn Link to the contributors LinkedIn profile
 * @param {String} github Link to the contributors GitHub profile
 * @param {Boolean} approved Whether the contributor has been approved or not
 */
const contributorSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    email: String,
    name: String,
    description: String,
    role: String,
    linkedIn: String,
    github: String,
    approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Contributor', contributorSchema);