const Onboarding = require('../models/OnboardingModel');
const Email = require('../utils/email');
const { sendOnboardingRequestWebhook } = require('../utils/discord');

/**
 * Function to accept an onboarding request, by setting the onboarded property to true
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.acceptOnboarding = async (req, res) => {

    // Check that request body contains all required fields
    const user = await Onboarding.findById(req.params.id);

    // Check if user exists, if not return 404
    if (!user) {
        return res.status(404).json({ error: "Not found" });
    }

    // Set onboarded property to true
    user.onboarded = true;

    // Save user to database
    await user.save();

    // Send onboarding email to user
    Email.sendOnboardingEmail(user.email, user.name);
    
    // Send ok response if successful
    return res.status(200).json({ message: "OK" });

}

/**
 * Function to get all pending onboarding requests from the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.getOnboardingRequests = async (req, res) => {

    // Get all users from database
    let users = await Onboarding.find();

    //only return users that have not been onboarded
    users = users.filter(user => user.onboarded === false);

    // Send response with all filtered  users if successful
    res.status(200).json({
        message: "OK",
        data: users,
    });
}

/**
 * Function to create a new onboarding request
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.requestOnboarding = async (req, res) => {

    // Check that request body contains all required fields
    if (req.body.email === undefined || req.body.email === "" || req.body.name === undefined || req.body.name === "") {
        return res.status(400).json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }

    const email = req.body.email;
    const name = req.body.name;

    // Create new user object
    const user = new Onboarding({
        email: email,
        name: name,
    });

    // Save user to database
    await user.save();

    // Send onboarding request to Discord Webhook
    sendOnboardingRequestWebhook(user.name);

    // Send ok response if successful
    return res.status(200).json({ message: "OK" });
}

/**
 * Function to bulk onboard multiple users at once
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.bulkOnboard = async (req, res) => {

    // Check that request body contains all required fields
    if (req.body.emails === undefined || req.body.emails === "") {
        return res.status(400).json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }

    const emails = req.body.emails;


    // iterate over all emails and create a new user object for each, save it to the database and send an onboarding email
    for (let i = 0; i < emails.length; i++) {
        const user = new Onboarding({
            email: emails[i],
            name: emails[i].split("@")[0],
            onboarded: true,
        });

        await user.save();
        Email.sendOnboardingEmail(user.email, user.name);
    }

    // Send ok response if successful
    return res.status(200).json({ message: "OK" });
}

/**
 * Function to manually onboard a user, without having to accept a request
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.manualOnboard = async (req, res) => {

    // Check that request body contains all required fields
    if (req.body.email === undefined || req.body.email === "" || req.body.name === undefined || req.body.name === "") {
        return res.status(400).json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }

    const email = req.body.email;
    const name = req.body.name;

    // Create new user object
    const user = new Onboarding({
        email: email,
        name: name,
        onboarded: true, //automatically approved here
    });

    // Save user to database
    await user.save();

    // Send onboarding email to user
    Email.sendOnboardingEmail(user.email, user.name);

    // Send ok response if successful
    return res.status(200).json({ message: "OK" });
}

