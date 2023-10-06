const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

exports.addPost = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    createdDate: req.body.createdDate,
    comments: req.body.comments,
  });

  const comment = new Comment({
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    subcomments: req.body.subcomments,
  });

  await post.save();

  res.status(200).json({
    message: "Post added successfully!",
    data: post,
  });
};

exports.getOnePost = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const dataId = req.params.id;
  const data = await Post.findOne({ id: dataId });
};

exports.getAllPosts = async (req, res) => {
  const post = await Post.find();

  res.status(200).json({
    message: "Post fetched successfully!",
    data: post,
  });
};

exports.updateAllPosts = async (req, res) => {};
