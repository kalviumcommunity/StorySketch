import { useState } from "react";
import StoryForm from "../components/StoryForm";
import StoryOutput from "../components/StoryOutput";
import "./StorySketch.css"; // Updated CSS import

export default function Home() {
  const [story, setStory] = useState(null);
  const [strategy, setStrategy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="storysketch-container">
      {/* Animated background elements */}
      <div className="storysketch-bg-animation">
        <div className="storysketch-bg-glow-1"></div>
        <div className="storysketch-bg-glow-2"></div>
        
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="storysketch-bg-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="storysketch-content">
        <header className="storysketch-header">
          <div className="storysketch-logo-container">
            <div className="storysketch-logo-wrapper">
              <div className="storysketch-logo-glow"></div>
              <div className="storysketch-logo">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H8v-6h3v6zm5 0h-3v-6h3v6zm-5-8H8V7h3v3zm5 0h-3V7h3v3z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="storysketch-title">StorySketch AI</h1> {/* Updated title */}
          
          <p className="storysketch-subtitle">
            Transform your ideas into captivating stories with AI-powered storytelling. 
            Select a creative strategy, share your concept, and watch your narrative come to life.
          </p>
        </header>

        <div className="storysketch-form-container">
          <StoryForm 
            setStory={setStory} 
            setStrategy={setStrategy} 
            setIsGenerating={setIsGenerating}
          />
        </div>

        {isGenerating && (
          <div className="storysketch-loading">
            <div className="storysketch-loading-dots">
              <div className="storysketch-loading-dot"></div>
              <div className="storysketch-loading-dot"></div>
              <div className="storysketch-loading-dot"></div>
            </div>
            <p className="storysketch-loading-text">Weaving your story...</p>
          </div>
        )}

        {strategy && !isGenerating && (
          <div className="storysketch-strategy">
            <div className="storysketch-strategy-badge">
              <span className="storysketch-strategy-indicator">
                <span className="storysketch-strategy-ping"></span>
                <span className="storysketch-strategy-dot"></span>
              </span>
              <span className="storysketch-strategy-text">
                Creative Approach: <span className="storysketch-strategy-value">{strategy}</span>
              </span>
            </div>
          </div>
        )}

        <div className="storysketch-output-container">
          <StoryOutput story={story} />
        </div>

        <footer className="storysketch-footer">
          <p>Unleash your creativity with AI-powered storytelling magic.</p>
        </footer>
      </div>
    </div>
  );
}