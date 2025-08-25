const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// 🔹 Helper to log token usage
function logTokenUsage(result, strategy) {
  if (result?.response?.usageMetadata) {
    console.log(`\n📊 Token Usage for ${strategy}:`);
    console.log("Prompt tokens:", result.response.usageMetadata.promptTokenCount);
    console.log("Response tokens:", result.response.usageMetadata.candidatesTokenCount);
    console.log("Total tokens:", result.response.usageMetadata.totalTokenCount);
  } else {
    console.log(`⚠️ No token usage info returned for ${strategy}`);
  }
}



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

// ✅ Dynamic Prompting with Temperature, Top P, and Top K
exports.dynamicPromptStory = async (req, res) => {
  try {
    const { prompt, genre, tone, length, temperature = 0.7, top_p = 0.9, top_k = 50 } = req.body;

    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    let styleInstructions = "";
    if (genre) styleInstructions += `Write the story in the **${genre}** genre.\n`;
    if (tone) styleInstructions += `The tone should be **${tone}**.\n`;
    if (length) styleInstructions += `The story should be about **${length}** paragraphs long.\n`;

    const storyPrompt = `
      You are StorySketch AI. Create a story based on the user’s prompt.
      ${styleInstructions}

      For each scene, include:
      - Narrative text
      - Character dialogue
      - Setting description
      - An illustration idea

      User Prompt: "${prompt}"
    `;

    const result = await model.generateContent(storyPrompt, { temperature, top_p, top_k });
    const story = result.response.text();

    logTokenUsage(result, "Dynamic Prompting");

    res.json({
      success: true,
      strategy: "Dynamic Prompting (StorySketch)",
      userPrompt: prompt,
      appliedSettings: { genre, tone, length, temperature, top_p, top_k },
      story,
    });
  } catch (error) {
    console.error("❌ Error generating dynamic story:", error.message || error);
    res.status(500).json({ success: false, message: "Error generating dynamic story", error: error.message });
  }
};

// ✅ Chain-of-Thought Prompting with Temperature, Top P, and Top K
exports.cotStory = async (req, res) => {
  try {
    const { prompt, scenes = 3, temperature = 0.7, top_p = 0.9, top_k = 50 } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    const storyPrompt = `
You are StorySketch AI.
You may plan step-by-step internally (chain-of-thought) to ensure coherence.
Do NOT include your internal reasoning in the output.
Return ONLY:
- "reasoningSummary": 3 concise bullet points explaining your approach.
- "title": compelling story title.
- "scenes": an array of ${scenes} scenes, each with:
  - id
  - title
  - narrative (4-6 sentences)
  - dialogue (1-3 lines)
  - setting (1-2 sentences)
  - illustrationPrompt (1 sentence)

User Prompt: "${prompt}"
    `;

    const result = await model.generateContent(storyPrompt, { temperature, top_p, top_k });
    const storyRaw = result.response.text();

    logTokenUsage(result, "Chain-of-Thought Prompting");

    res.json({
      success: true,
      strategy: "Chain-of-Thought Prompting (StorySketch)",
      userPrompt: prompt,
      appliedSettings: { scenes, temperature, top_p, top_k },
      story: storyRaw,
    });
  } catch (error) {
    console.error("❌ Error generating CoT story:", error.message || error);
    res.status(500).json({ success: false, message: "Error generating CoT story", error: error.message });
  }
};
