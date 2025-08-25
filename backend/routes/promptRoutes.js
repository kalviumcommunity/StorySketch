const express = require("express");
const router = express.Router();
const { zeroShotStory, oneShotStory, multiShotStory, dynamicPromptStory, cotStory, structuredStory } = require("../controllers/promptController");

// POST /api/zero-shot
router.post("/zero-shot", zeroShotStory);

// POST /api/one-shot
router.post("/one-shot", oneShotStory);

// POST /api/multi-shot
router.post("/multi-shot", multiShotStory);

// POST /api/dynamic
router.post("/dynamic", dynamicPromptStory);

// POST /api/cot
router.post("/cot", cotStory);

// POST /api/structured
router.post("/structured", structuredStory);

module.exports = router;
