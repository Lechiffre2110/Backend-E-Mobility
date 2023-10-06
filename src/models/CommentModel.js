const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const commentSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  subcomments: [commentSchema],
  ref: "Comment",
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
