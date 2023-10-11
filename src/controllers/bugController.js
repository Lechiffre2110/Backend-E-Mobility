const Bug = require("../models/BugModel");
const { sendBugReportWebhook } = require("../utils/discord");

/**
 * Function to add a bug report to the database
 * @param {*} req HTTP request object 
 * @param {*} res HTTP response object 
 */
exports.addBug = async (req, res) => {
    // Check that request body contains all required fields
  if (!req.body.description || !req.body.title || !req.body.model) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  // Create new bug
  const bug = new Bug({
    contact: req.body.contact,
    title: req.body.title,
    model: req.body.model,
    description: req.body.description,
  });

  // Save bug to database
  await bug.save();

  // Send notification about bug report to Discord
  sendBugReportWebhook(bug.title, bug.description, bug.contact)

  // Send response if successful
  res.status(200).json({
    message: "OK",
    data: bug,
  });
};

/**
 * Function to get all bug reports from the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.getBugs = async (req, res) => {

    // Get all bug reports from database
    const bugs = await Bug.find();

    // Send response with all bugs if successful
    res.status(200).json({
        message: "OK",
        data: bugs,
    });
};

/**
 * Function to resolve a bug report, by setting the resolved property to true
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.resolveBug = async (req, res) => {

    // Find bug report by id
    try {
        const bug = await Bug.findById(req.params.id);
        if (!bug) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        // Set resolved property to true and save bug report
        bug.resolved = true;
        await bug.save();

        // Send response if successful
        res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        // Send error response if unsuccessful
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

