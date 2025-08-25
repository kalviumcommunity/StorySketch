const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Zero-Shot Prompting
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
    const story = result.response.text();

    res.json({
      success: true,
      strategy: "Zero-Shot Prompting (StorySketch)",
      userPrompt: prompt,
      story,
    });
  } catch (error) {
    console.error("❌ Error generating zero-shot story:", error.message || error);
    res.status(500).json({
      success: false,
      message: "Error generating zero-shot story",
      error: error.message,
    });
  }
};

// ✅ One-Shot Prompting
exports.oneShotStory = async (req, res) => {
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

      Here’s an example for reference:

      Example Prompt: "A boy finds a magical key in his backyard"
      Example Output:
      Scene 1: 
      - Narrative: Arjun dug through the soil and uncovered a glowing silver key. 
      - Dialogue: "What’s this doing here?" he whispered.
      - Setting: A small backyard under the twilight sky.
      - Illustration Idea: A boy holding a glowing key in his muddy hands.

      ---

      Now, create a new story based on the user’s prompt:
      User Prompt: "${prompt}"
    `;

    const result = await model.generateContent(storyPrompt);
    const story = result.response.text();

    res.json({
      success: true,
      strategy: "One-Shot Prompting (StorySketch)",
      userPrompt: prompt,
      story,
    });
  } catch (error) {
    console.error("❌ Error generating one-shot story:", error.message || error);
    res.status(500).json({
      success: false,
      message: "Error generating one-shot story",
      error: error.message,
    });
  }
};
