const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
// or gemini-1.5-pro, but gemini-2.5-pro is not in the Node SDK yet

exports.zeroShotStory = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const storyPrompt = `
      You are StorySketch AI. Create a short story from the user's prompt, divided into 2-3 scenes. 
      For each scene, include:
      - Narrative text
      - Character dialogue
      - Setting description
      - An illustration idea

      User Prompt: "${prompt}"
    `;

    const result = await model.generateContent(storyPrompt);

    // ✅ Simplified text extraction
    const story = result.response.text();

    res.json({
      success: true,
      strategy: "Zero-Shot Prompting (StorySketch)",
      userPrompt: prompt,
      story,
    });

  } catch (error) {
    console.error("❌ Error generating story:", error.message || error);
    res.status(500).json({
      success: false,
      message: "Error generating zero-shot story",
      error: error.message,
    });
  }
};