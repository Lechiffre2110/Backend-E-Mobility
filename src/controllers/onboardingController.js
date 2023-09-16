const Onboarding = require('../models/OnboardingModel');
const Email = require('../utils/email');
const { sendOnboardingRequestWebhook } = require('../utils/discord');

exports.acceptOnboarding = async (req, res) => {
    const user = await Onboarding.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "Not found" });
    }

    user.onboarded = true;

    await user.save();

    Email.sendOnboardingEmail(user.email, user.name);
    

    return res.status(200).json({ message: "OK" });

}

exports.getOnboardingRequests = async (req, res) => {
    let users = await Onboarding.find();

    //only return users that have not been onboarded
    users = users.filter(user => user.onboarded === false);

    res.status(200).json({
        message: "OK",
        data: users,
    });
}

exports.requestOnboarding = async (req, res) => {
    if (req.body.email === undefined || req.body.email === "" || req.body.name === undefined || req.body.name === "") {
        return res.status(400).json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }

    const email = req.body.email;
    const name = req.body.name;

    const user = new Onboarding({
        email: email,
        name: name,
    });

    await user.save();
    sendOnboardingRequestWebhook(user.name);

    return res.status(200).json({ message: "OK" });
}

