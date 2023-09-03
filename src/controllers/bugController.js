const Bug = require("../models/BugModel");
const { sendBugReportWebhook } = require("../utils/discord");

exports.addBug = async (req, res) => {
  if (!req.body.description || !req.body.title || !req.body.model) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const bug = new Bug({
    contact: req.body.contact,
    title: req.body.title,
    model: req.body.model,
    description: req.body.description,
  });

  await bug.save();
  sendBugReportWebhook(bug.title, bug.description, bug.contact)

  res.status(200).json({
    message: "Bug reported successfully!",
    data: bug,
  });
};

exports.getBugs = async (req, res) => {
    const bugs = await Bug.find();

    res.status(200).json({
        message: "Bugs fetched successfully!",
        data: bugs,
    });
};

exports.resolveBug = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);
        if (!bug) {
            return res.status(404).json({
                message: "Bug not found",
            });
        }

        bug.resolved = true;
        await bug.save();

        res.status(200).json({
            message: "Bug resolved successfully!",
            data: bug,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}


exports.editBug = async (req, res) => {
    console.log(req.body);
}
