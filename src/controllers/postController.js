const Post = require("../models/PostModel");

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

  await post.save();

  res.status(200).json({
    message: "Post added successfully!",
    data: post,
  });
};

exports.getAllPosts = async (req, res) => {
  const post = await Post.find();

  res.status(200).json({
    message: "Post fetched successfully!",
    data: post,
  });
};

exports.updatePosts = async (req, res) => {
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

  await post.save();

  res.status(200).json({
    message: "Post added successfully!",
    data: post,
  });
};

exports.deletePost = async (req, res) => {};
