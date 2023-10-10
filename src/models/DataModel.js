const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Model for a data
 * @param {String} id ID of the data (UUID)
 * @param {String} filename Filename of the data
 * @param {String} uploader Name of the uploader
 * @param {String} uploadDate Date of the upload
 * @param {String} description Description of the data
 * @param {String} model Model of the car
 * @param {Object} file File object
 */
const dataSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    filename: String, 
    uploader: String, 
    uploadDate: String,
    description: String,
    model: String,
    file: Object
});

module.exports = mongoose.model('Data', dataSchema);