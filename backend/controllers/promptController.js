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


// ✅ Multi-Shot Prompting
exports.multiShotStory = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    const storyPrompt = `
      You are StorySketch AI. Create a short story from the user's prompt, divided into 2-3 scenes. 
      For each scene, include:
      - Narrative text
      - Character dialogue
      - Setting description
      - An illustration idea

      Here are multiple examples for reference:

      Example 1 Prompt: "A girl befriends a dragon in the mountains"
      Example 1 Output:
      Scene 1:
      - Narrative: High in the misty peaks, Meera stumbled upon a dragon with shimmering emerald scales.
      - Dialogue: "Don’t be afraid," Meera whispered.
      - Setting: Snowy cliffs under a rising sun.
      - Illustration Idea: A girl reaching out to touch a gentle dragon.

      ---

      Example 2 Prompt: "A robot learns how to play music"
      Example 2 Output:
      Scene 1:
      - Narrative: Sparks flew as the robot tapped an old piano, learning to make melodies.
      - Dialogue: "Music… I can feel it," said the robot.
      - Setting: A dusty workshop filled with tools and wires.
      - Illustration Idea: A rusty robot playing piano keys.

      ---

      Now, create a new story based on the user’s prompt:
      User Prompt: "${prompt}"
    `;

    const result = await model.generateContent(storyPrompt);
    const story = result.response.text();

    res.json({
      success: true,
      strategy: "Multi-Shot Prompting (StorySketch)",
      userPrompt: prompt,
      story,
    });
  } catch (error) {
    console.error("❌ Error generating multi-shot story:", error.message || error);
    res.status(500).json({ success: false, message: "Error generating multi-shot story", error: error.message });
  }
};