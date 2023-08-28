const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const contributorController = require("../controllers/contributorController");

router.post("/add", upload.none(), contributorController.addContributor);
router.get("/get", contributorController.getContributors);
router.post("/approve", upload.none(), contributorController.approveContributor);
router.post("/decline", upload.none(), contributorController.declineContributor);

module.exports = router;