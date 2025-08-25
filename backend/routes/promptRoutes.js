const express = require("express");
const router = express.Router();
const { zeroShotStory, oneShotStory, multiShotStory, dynamicPromptStory } = require("../controllers/promptController");

// POST /api/zero-shot
router.post("/zero-shot", zeroShotStory);

// POST /api/one-shot
router.post("/one-shot", oneShotStory);

// POST /api/multi-shot
router.post("/multi-shot", multiShotStory);

// POST /api/dynamic
router.post("/dynamic", dynamicPromptStory);

module.exports = router;
