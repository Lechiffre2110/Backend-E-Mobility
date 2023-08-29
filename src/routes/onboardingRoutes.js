const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const onboardingController = require("../controllers/onboardingController");

router.put("/:id/accept", upload.none(), onboardingController.acceptOnboarding);
//router.post("/decline", upload.none(), onboardingController.declineOnboarding);
router.post("/", upload.none(), onboardingController.requestOnboarding);
router.get("/", onboardingController.getOnboardingRequests);

module.exports = router;