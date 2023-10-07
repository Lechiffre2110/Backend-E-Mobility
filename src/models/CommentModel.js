const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: Number,
  author: String,
  content: String,
  date: Date,
  subcomments: [
    {
      id: Number,
      author: String,
      content: String,
      date: Date,
    },
  ],
});

module.exports = commentSchema;
