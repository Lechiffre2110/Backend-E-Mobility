const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const contributorController = require("../controllers/contributorController");

router.post("/", upload.none(), contributorController.addContributor);
router.get("/", contributorController.getContributors);
router.put("/:id/approve", upload.none(), contributorController.approveContributor);
router.delete("/:id/decline", upload.none(), contributorController.declineContributor);

module.exports = router;