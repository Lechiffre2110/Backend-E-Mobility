const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    name: String,
    email: String,
    onboarded: { type: Boolean, default: false },
});

module.exports = mongoose.model('Onboarding', onboardingSchema);