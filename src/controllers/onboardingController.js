const Onboarding = require('../models/OnboardingModel');

exports.acceptOnboarding = async (req, res) => {
    if (req.body.id === undefined || req.body.id === "") {
        return res.status(400).json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }

    const id = req.body.id;

    const user = await Onboarding.findById(id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.onboarded = true;

    await user.save();

    //send onboarding email to user

    return res.status(200).json({ message: "Onboarding email sent" });

}

exports.getOnboardingRequests = async (req, res) => {
    let users = await Onboarding.find();

    //only return users that have not been onboarded
    users = users.filter(user => user.onboarded === false);

    res.status(200).json({
        message: "Users fetched successfully!",
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

    return res.status(200).json({ message: "Onboarding request sent" });
}

