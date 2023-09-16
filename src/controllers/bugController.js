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
    message: "OK",
    data: bug,
  });
};

exports.getBugs = async (req, res) => {
    const bugs = await Bug.find();

    res.status(200).json({
        message: "OK",
        data: bugs,
    });
};

exports.resolveBug = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);
        if (!bug) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        bug.resolved = true;
        await bug.save();

        res.status(200).json({
            message: "OK",
            data: bug,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


exports.editBug = async (req, res) => {
    console.log(req.body);
}
