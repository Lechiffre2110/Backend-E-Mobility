const mongoose = require("mongoose");
const commentSchema = require("./CommentModel");

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  category: String,
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
