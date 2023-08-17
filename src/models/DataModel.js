const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    filename: String, 
    uploader: String, 
    carModel: String, 
    uploadDate: Date,
    description: String,
    path: String
});

module.exports = mongoose.model('Data', dataSchema);