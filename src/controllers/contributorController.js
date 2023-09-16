const Contributor = require("../models/ContributorModel");
const { sendContributorWebhook } = require("../utils/discord");

exports.addContributor = async (req, res) => {
  if (!req.body.description || !req.body.name || !req.body.role) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const contributor = new Contributor({
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
    role: req.body.role,
    linkedIn: req.body.linkedIn,
    github: req.body.github,
  });

  await contributor.save();

  sendContributorWebhook(req.body.name, req.body.role, req.body.description);

  res.status(200).json({
    message: "Contributor added successfully!",
    data: contributor,
  });
};

exports.getContributors = async (req, res) => {
  const contributors = await Contributor.find();

  res.status(200).json({
    message: "Contributors fetched successfully!",
    data: contributors,
  });
};

exports.approveContributor = async (req, res) => {
  try {
    const contributor = await Contributor.findById(req.params.id);
    if (!contributor) {
      return res.status(404).json({
        message: "OK",
      });
    }

    contributor.approved = true;
    await contributor.save();

    res.status(200).json({
      message: "OK",
      data: contributor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.declineContributor = async (req, res) => {
  try {
    const contributor = await Contributor.findById(req.params.id);
    if (!contributor) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    await contributor.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "OK",
      data: contributor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
