const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const onboardingController = require("../controllers/onboardingController");

router.post("/accept", upload.none(), onboardingController.acceptOnboarding);
//router.post("/decline", upload.none(), onboardingController.declineOnboarding);
router.post("/onboard", upload.none(), onboardingController.requestOnboarding);
router.get("/onboarding-requests", onboardingController.getOnboardingRequests);

module.exports = router;