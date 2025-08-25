const express = require("express");
const router = express.Router();
const { zeroShotStory, oneShotStory } = require("../controllers/promptController");

// POST /api/zero-shot
router.post("/zero-shot", zeroShotStory);

// POST /api/one-shot
router.post("/one-shot", oneShotStory);

module.exports = router;
