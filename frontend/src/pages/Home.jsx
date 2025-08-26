import { useState } from "react";
import StoryForm from "../components/StoryForm";
import StoryOutput from "../components/StoryOutput";

export default function Home() {
  const [story, setStory] = useState(null);
  const [strategy, setStrategy] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-12">
      <h1 className="text-5xl font-extrabold mb-10 text-purple-900 text-center drop-shadow-lg">
        📚 StorySketch AI
      </h1>

      <StoryForm setStory={setStory} setStrategy={setStrategy} />

      {strategy && (
        <h3 className="mt-8 text-xl font-semibold text-purple-800">
          Selected Strategy: {strategy}
        </h3>
      )}

      <StoryOutput story={story} />
    </div>
  );
}
