const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const quickActionController = require("../controllers/quickActionController");


router.post("/meeting", upload.none(), quickActionController.sendMeetingReminder);
router.post("/book", upload.none(),quickActionController.sendBookingRequest);
router.post("/invite", upload.none(), quickActionController.sendUploadInvite);

module.exports = router;