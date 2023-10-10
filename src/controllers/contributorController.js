const Contributor = require("../models/ContributorModel");
const { sendContributorWebhook } = require("../utils/discord");

/**
 * Function to add a contributor to the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.addContributor = async (req, res) => {

  // Check that request body contains all required fields
  if (!req.body.description || !req.body.name || !req.body.role) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  // Create new contributor
  const contributor = new Contributor({
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
    role: req.body.role,
    linkedIn: req.body.linkedin,
    github: req.body.github,
  });

  // Save contributor to database
  await contributor.save();

  // Send notification about contributor to Discord
  sendContributorWebhook(req.body.name, req.body.role, req.body.description);

  // Send response if successful
  res.status(200).json({
    message: "Contributor added successfully!",
  });
};

/**
 * Function to get all contributors from the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.getContributors = async (req, res) => {

  // Get all contributors from database
  const contributors = await Contributor.find();

  // Send response with all contributors if successful
  res.status(200).json({
    message: "Contributors fetched successfully!",
    data: contributors,
  });
};

/**
 * Function to approve a contributor, by setting the approved property to true
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.approveContributor = async (req, res) => {

  // Find contributor by id
  try {
    const contributor = await Contributor.findById(req.params.id);
    if (!contributor) {
      return res.status(404).json({
        message: "OK",
      });
    }

    // Set approved property to true and save contributor
    contributor.approved = true;
    await contributor.save();

    // Send response if successful
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {

    // Send error response if failed
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * Function to decline a contributor, by deleting it from the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.declineContributor = async (req, res) => {

  // Find contributor by id
  try {
    const contributor = await Contributor.findById(req.params.id);
    if (!contributor) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    // Delete contributor from database
    await contributor.deleteOne({ _id: req.params.id });

    // Send ok response if successful
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    
    // Send error response if failed
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
