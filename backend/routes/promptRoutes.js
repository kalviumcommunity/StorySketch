const express = require("express");
const router = express.Router();
const { zeroShotStory, oneShotStory, multiShotStory, dynamicPromptStory, cotStory, structuredStory, stopSequenceStory, createEmbeddings, searchEmbeddings } = require("../controllers/promptController");

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

// POST /api/stop-sequence
router.post("/stop-sequence", stopSequenceStory);

// POST /api/embeddings/create
router.post("/embeddings/create", createEmbeddings);

// POST /api/embeddings/search
router.post("/embeddings/search", searchEmbeddings);

module.exports = router;
