const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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