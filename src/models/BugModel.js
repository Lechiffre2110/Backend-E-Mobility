const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bugSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    contact: String,
    title: String,
    model: String,
    description: String,
    resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bug', bugSchema);