export default function StoryOutput({ story }) {
  if (!story) return null;

  // String response
  if (typeof story === "string") {
    return (
      <div className="mt-10 w-full max-w-3xl flex flex-col gap-6">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-purple-900 text-center">📖 Your Generated Story</h2>
          <pre className="whitespace-pre-wrap text-gray-700 text-lg">{story}</pre>
        </div>
      </div>
    );
  }

  // Structured story response
  return (
    <div className="mt-10 w-full max-w-4xl flex flex-col gap-8">
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold mb-4 text-purple-900 text-center">📖 {story.title}</h2>
        <p className="text-gray-700 text-lg mb-6"><strong>Summary:</strong> {story.summary}</p>
      </div>

      {story.scenes.map((scene) => (
        <div
          key={scene.id}
          className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all"
        >
          {/* Placeholder for scene illustration */}
          <img
            src={scene.image || "https://source.unsplash.com/400x250/?fantasy,book"}
            alt={scene.title}
            className="w-full md:w-1/3 rounded-2xl object-cover shadow-lg"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{scene.title}</h3>
            <p className="text-gray-700 mb-2"><strong>Narrative:</strong> {scene.narrative}</p>

            <p className="text-gray-700 mb-1"><strong>Dialogue:</strong></p>
            <ul className="list-disc ml-5 mb-2 text-gray-700">
              {scene.dialogue.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>

            <p className="text-gray-700 mb-1"><strong>Setting:</strong> {scene.setting}</p>
            <p className="text-gray-700"><strong>Illustration Idea:</strong> {scene.illustrationPrompt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
