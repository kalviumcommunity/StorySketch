import { useState } from "react";
import API from "../api/api";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl rounded-3xl w-full max-w-xl border border-yellow-200"
    >
      <h2 className="text-3xl font-bold text-orange-900 mb-4 text-center">✨ Story Generator</h2>

      <textarea
        className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all resize-none text-gray-700 placeholder-gray-400"
        rows="5"
        placeholder="Enter your story prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <select
        className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all text-gray-700"
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
        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-2xl hover:bg-orange-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate Story"}
      </button>
    </form>
  );
}
