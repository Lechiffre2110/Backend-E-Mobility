const express = require("express");
const router = express.Router();
const multer = require("multer");
const dataController = require("../controllers/dataController");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Set your desired directory here
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), dataController.uploadData);

router.get("/", dataController.getDataInformation);

router.get("/download/:id", dataController.downloadFile);

router.get("/download", dataController.downloadAllFiles);

module.exports = router;