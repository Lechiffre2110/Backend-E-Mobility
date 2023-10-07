const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Comment = require("./CommentModel");

const postSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  title: String,
  content: String,
  createdDate: { type: Date, default: Date.now },
  category: String,
  comments: Array,
  //ref: Comment,
});

module.exports = mongoose.model("Post", postSchema);
