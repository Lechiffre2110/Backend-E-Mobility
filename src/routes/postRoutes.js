const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const postController = require("../controllers/postController");

router.post("/", upload.none(), postController.addPost);
router.get("/", postController.getAllPosts);
router.put("/post", upload.none(), postController.updatePosts);

module.exports = router;
