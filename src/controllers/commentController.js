const Comment = require("../models/CommentModel");

exports.getComments = async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({
    message: "OK",
    data: comments,
  });
};

exports.updateComments = async (req, res) => {
  if (!req.body.content) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const comment = new Comment({
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    subcomments: req.body.subcomments,
  });

  await comment.save();

  res.status(200).json({
    message: "Comment added successfully!",
    data: comment,
  });
};

exports.deleteComment = async (req, res) => {};
