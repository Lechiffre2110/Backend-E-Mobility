const mongoose = require("mongoose");

/**
 * Model for a comment
 *
 * @param {Number} id ID of the comment, currently not in use!
 * @param {String} author Author of the comment
 * @param {String} content Content of the comment
 * @param {Date} date Date of the comment when it was created
 * @param {Array} subcomments An array of subcomments that answer the comment, currently not in use!
 */
const commentSchema = new mongoose.Schema({
  //id: Number,
  author: String,
  content: String,
  date: Date,
  /*subcomments: [ Später hinzufügen wenn Subcomments möglich sind
    {
      id: Number,
      author: String,
      content: String,
      date: Date,
    },
  ],*/
});

module.exports = commentSchema;
