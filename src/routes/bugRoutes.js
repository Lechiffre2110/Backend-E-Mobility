const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const bugController = require("../controllers/bugController");

router.post("/add", upload.none(), bugController.addBug);
router.get("/get", bugController.getBugs);
router.post("/resolve", upload.none(), bugController.resolveBug);
router.post("/edit", upload.none(), bugController.editBug);

module.exports = router;