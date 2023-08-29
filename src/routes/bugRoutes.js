const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const bugController = require("../controllers/bugController");

router.post("/", upload.none(), bugController.addBug);
router.get("/", bugController.getBugs);
router.put("/:id/resolve", upload.none(), bugController.resolveBug);
router.put("/:id", upload.none(), bugController.editBug);

module.exports = router;