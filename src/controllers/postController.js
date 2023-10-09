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

exports.updateComment = async (req, res) => {
  const post = await Post.findById(req.params._id);

  if (!req.body.content) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const comment = new Comment({
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    sucomments: req.body.subcomments,
  });

  comment
    .save()
    .then(() => Post.findById(req.params._id))
    .then((post) => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = async (req, res) => {};
