import { useState } from "react";
import API from "../api/api";
import "./StoryForm.css";

const strategies = [
  { label: "Zero-Shot", value: "zero-shot" },
  { label: "One-Shot", value: "one-shot" },
  { label: "Multi-Shot", value: "multi-shot" },
  { label: "Dynamic", value: "dynamic" },
  { label: "Chain-of-Thought", value: "cot" },
  { label: "Structured", value: "structured" },
  { label: "Stop-Sequence", value: "stop-sequence" },
];

export default function StoryForm({ setStory, setStrategy }) {
  const [prompt, setPrompt] = useState("");
  const [strategy, selectStrategy] = useState("zero-shot");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    try {
      const res = await API.post(`/${strategy}`, { prompt });
      setStory(res.data.story);
      setStrategy(res.data.strategy || strategy);
    } catch (err) {
      console.error("Error:", err);
      setStory("❌ Failed to generate story.");
      setStrategy(strategy);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="story-form">
      <h2 className="story-form-title">Create Your Story</h2>
      <p className="story-form-subtitle">
        Select a storytelling strategy and describe your idea.
      </p>

      <textarea
        className="story-form-textarea"
        rows="5"
        placeholder="Write your story idea here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <select
        className="story-form-select"
        value={strategy}
        onChange={(e) => selectStrategy(e.target.value)}
      >
        {strategies.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`story-form-button ${loading ? 'story-form-loading' : ''}`}
      >
        {loading ? (
          <>
            <span className="mr-2">✨</span> Generating...
          </>
        ) : (
          <>
            <span className="mr-2">🚀</span> Generate Story
          </>
        )}
      </button>
    </form>
  );
}