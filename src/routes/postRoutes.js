const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const postController = require("../controllers/postController");

router.post("/", upload.none(), postController.addPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.put("/", upload.none(), postController.updateAllPost);
