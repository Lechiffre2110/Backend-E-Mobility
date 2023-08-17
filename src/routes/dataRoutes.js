const express = require("express");
const router = express.Router();
const multer = require("multer");
const dataController = require("../controllers/dataController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), dataController.uploadData);

router.get("/data", dataController.getDataInformation);

router.get("/download/:id", dataController.downloadFile);

router.get("/downloadAll", dataController.downloadAllFiles);

module.exports = router;