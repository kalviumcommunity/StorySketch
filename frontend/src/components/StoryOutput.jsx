import "./StoryOutput.css";

export default function StoryOutput({ story }) {
  if (!story) return null;

  // Plain string story
  if (typeof story === "string") {
    return (
      <div className="story-output-container">
        <div className="story-output-plain">
          <h2 className="story-output-plain-title">📖 Your Story</h2>
          <div className="story-output-plain-content">{story}</div>
        </div>
      </div>
    );
  }

  // Structured story
  return (
    <div className="story-output-container">
      <div className="story-output-structured">
        <div className="story-output-header">
          <h2 className="story-output-title">{story.title}</h2>
          <p className="story-output-summary">
            <strong>Summary:</strong> {story.summary}
          </p>
        </div>

        {story.scenes.map((scene) => (
          <div key={scene.id} className="story-output-scene">
            <img
              src={scene.image || "https://source.unsplash.com/400x250/?fantasy,storybook"}
              alt={scene.title}
              className="story-output-scene-image"
            />

            <div className="story-output-scene-content">
              <h3 className="story-output-scene-title">{scene.title}</h3>
              <p className="story-output-scene-text">
                <strong>Narrative:</strong> {scene.narrative}
              </p>
              
              <div className="story-output-dialogue">
                <p className="story-output-dialogue-title">Dialogue:</p>
                <ul className="story-output-dialogue-list">
                  {scene.dialogue.map((line, idx) => (
                    <li key={idx} className="story-output-dialogue-item">{line}</li>
                  ))}
                </ul>
              </div>
              
              <p className="story-output-scene-text">
                <strong>Setting:</strong> {scene.setting}
              </p>
              
              <p className="story-output-scene-text">
                <strong>Illustration Idea:</strong> {scene.illustrationPrompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}