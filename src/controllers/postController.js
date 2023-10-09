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
  try {
    const postId = req.params.id;
    const commentData = {
      id: req.body.id,
      author: req.body.author,
      content: req.body.content,
      date: new Date(),
    };

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push(commentData);

    await post.save();

    res.status(200).json({
      message: "Comment added successfully!",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateSubComment = async (req, res) => {
  //Subcomment grade nicht möglich, da CommentModel nicht als mongoose.model exportiert wird
  try {
    const commentId = req.params.commentId;
    const subcommentData = {
      id: req.body.id,
      author: req.body.author,
      content: req.body.content,
      date: new Date(),
    };

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.subcomments.push(subcommentData);

    await comment.save();

    res.status(200).json({
      message: "Subcomment added successfully!",
      data: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*exports.updateComment = async (req, res) => {
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
    .then(() => Post.findById(req.params.id))
    .then((post) => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};*/

exports.deletePost = async (req, res) => {};
