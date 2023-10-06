const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);
router.put("/comments", upload.none(), commentController.updateComments);
router.delete("/", commentController.deleteComment);

module.exports = router;
