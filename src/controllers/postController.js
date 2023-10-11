const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

/**
 * POST function for adding a post to the database; Currently not in use!
 * @param {*} req HTTP request object
 * @param {*} res HTTP resonse object
 * @returns
 */
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

/**
 * GET Function to
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.getAllPosts = async (req, res) => {
  const post = await Post.find();

  res.status(200).json({
    message: "Post fetched successfully!",
    data: post,
  });
};

/**
 * PUT request to update a post and in our case also Post it to the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @returns
 */
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

/**
 * PUT request to update a comment and in our case also Post it to the database
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @returns
 */
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

/**
 * PUT Request to update a subcomment and in our case also Post it to the subcomments array in CommentModel and post it into the database.
 * Currently not available due to CommentModel not being a mongoose.model export.
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @returns
 */
exports.updateSubComment = async (req, res) => {
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

/**
 * TODO: Implement this function
 * Deletes a Post from the Database.
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 */
exports.deletePost = async (req, res) => {};
