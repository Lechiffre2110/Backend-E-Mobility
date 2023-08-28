const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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