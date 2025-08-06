# StorySketch

**StorySketch** is a minimal generative AI application that transforms simple user prompts into short, illustrated stories. By combining GPT-4’s advanced storytelling and function calling capabilities with Retrieval-Augmented Generation (RAG) and text-to-image synthesis, StorySketch delivers rich narratives paired with compelling visuals.

---

## Project Overview

StorySketch takes a user’s prompt and generates a fully structured short story, divided into scenes. Each scene includes:

- Narrative text  
- Character dialogue  
- Setting descriptions  
- Tailored illustration prompts  

GPT-4 not only crafts the story but also uses **function calling** to trigger image generation for each scene, creating vivid, contextual illustrations. Optionally, **Retrieval-Augmented Generation (RAG)** enriches the story by incorporating external knowledge from vector databases, enhancing the accuracy and depth of the narrative.

The combined text and images are then rendered into an engaging final output, suitable for reading or sharing.

---

## Tech Stack and Their Roles

| Technology                       | Role in StorySketch                                                                 |
|---------------------------------|------------------------------------------------------------------------------------|
| **GPT-4 with Function Calling** | Generates structured story data and dynamically calls functions to create scene illustrations. |
| **Retrieval-Augmented Generation (RAG)** | Provides external contextual knowledge by querying vector databases to enrich story content.  |
| **Text-to-Image Models** (DALL·E, Stable Diffusion) | Generates scene illustrations from GPT-4’s image prompts triggered via function calls.         |
| **Python 3.10+**                | Implements the core application logic, integrating GPT-4 calls, retrieval, image generation, and rendering. |
| **HTML/CSS Renderer**           | Combines story text and illustrations into a visually appealing, user-friendly format for web display or export (e.g., PDF). |

---

## Features

- ✨ **Turn simple prompts into rich, structured stories**  
- 🎭 **Scene-by-scene generation** with characters, settings, dialogues, and image prompts  
- 🔄 **Dynamic function calling** to trigger AI-generated illustrations  
- 📚 **Optional knowledge enrichment** using RAG and vector databases  
- 🛠️ **Modular Python codebase** designed for easy extension and customization  
- 📄 **Ready for export** to HTML, PDF, or other formats (planned for future releases)  

---

*Bring your stories to life with words and images, effortlessly!*

