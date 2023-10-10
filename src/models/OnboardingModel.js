const mongoose = require('mongoose');

/**
 * Model for a onboarding
 * @param {String} name Name of the user
 * @param {String} email Email of the user
 * @param {Boolean} onboarded Whether the user has been approved for onboarding or not
 */
const onboardingSchema = new mongoose.Schema({
    name: String,
    email: String,
    onboarded: { type: Boolean, default: false },
});

module.exports = mongoose.model('Onboarding', onboardingSchema);