// Project data that can be imported directly without API call
export const projects = [
  {
    id: "clip",
    title: "CLIP - Command Line Interface for Prompting",
    description: "A command-line interface to chat with LLM models that supports OpenAI's Response API.",
    longDescription: "CLIP is a terminal-based tool that allows you to chat with LLM models through OpenAI's Response API. It features conversation management, context pause/resume, web search capability, and an intuitive command interface. Built as a personal developer tool using Node.js and OpenAI's Responses API.",
    technologies: ["Node.js", "JavaScript", "OpenAI API", "CLI", "Terminal"],
    url: "https://github.com/rbadillap/clip",
    featured: true,
    screenshot: "/projects/clip/screenshot.svg",
    featuredImage: "/projects/clip/screenshot.svg",
    commands: [
      "/help - Show help information",
      "/continue - Resume conversation with the most recent response",
      "/continue n - Continue from response #n in the current conversation",
      "/history - View the response history for the current conversation",
      "/history --all - View response history across all conversations",
      "/new - Start a new conversation with fresh context",
      "/debug - Show current conversation state (for troubleshooting)",
      "/clear - Clear the screen",
      "/exit - Exit the application"
    ]
  }
]; 