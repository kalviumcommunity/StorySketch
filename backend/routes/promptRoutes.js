const express = require("express");
const router = express.Router();
const { zeroShotStory } = require("../controllers/promptController");

// POST /api/zero-shot
router.post("/zero-shot", zeroShotStory);

module.exports = router;