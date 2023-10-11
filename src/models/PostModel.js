const mongoose = require("mongoose");
const commentSchema = require("./CommentModel");

/**
 * Model for a post
 *
 * @param {Number} id ID of the post, currently not in use!
 * @param {String} title Title of the post
 * @param {String} content Content of the post
 * @param {Date} date Date of the post when it was created
 * @param {String} category Category of the post
 * @param {Array} comments An array of comments that answer the post
 */
const postSchema = new mongoose.Schema({
  //id: Number,
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  category: String,
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
