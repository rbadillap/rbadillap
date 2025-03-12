import { NextResponse } from "next/server"

// This would typically come from a database or CMS
const projects = [
  {
    id: "clip",
    title: "CLIP - Command Line Interface for Prompting",
    description: "A command-line interface to chat with LLM models that supports OpenAI's Response API.",
    longDescription: "CLIP is a terminal-based tool that allows you to chat with LLM models through OpenAI's Response API. It features conversation management, context pause/resume, web search capability, and an intuitive command interface. Built as a personal developer tool using Node.js and OpenAI's Responses API.",
    technologies: ["Node.js", "JavaScript", "OpenAI API", "CLI", "Terminal"],
    url: "https://github.com/rbadillap/clip",
    featured: true,
    screenshot: "/projects/clip/screenshot.svg", // Updated to use the SVG we created
    featuredImage: "/projects/clip/screenshot.svg", // Using the same SVG for now
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
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")
  const technology = searchParams.get("technology")
  const id = searchParams.get("id")
  
  // Filter projects based on query parameters
  let filteredProjects = [...projects]
  
  if (featured === "true") {
    filteredProjects = filteredProjects.filter(project => project.featured)
  }
  
  if (technology) {
    filteredProjects = filteredProjects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  if (id) {
    filteredProjects = filteredProjects.filter(project => project.id === id)
  }
  
  // Define Content-Type based on format parameter
  const format = searchParams.get("format") || "json"
  
  switch (format) {
    case "json":
      return NextResponse.json({ projects: filteredProjects })
    case "xml":
      const xml = generateXML(filteredProjects)
      return new NextResponse(xml, {
        headers: {
          "Content-Type": "application/xml",
        },
      })
    default:
      return NextResponse.json(
        { error: "Unsupported format" },
        { status: 400 }
      )
  }
}

// Helper function to generate XML
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  url: string;
  featured: boolean;
  screenshot?: string;
  featuredImage?: string;
  commands?: string[];
}

function generateXML(projects: Project[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<projects>\n'
  
  projects.forEach(project => {
    xml += '  <project>\n'
    xml += `    <id>${project.id}</id>\n`
    xml += `    <title>${project.title}</title>\n`
    xml += `    <description>${project.description}</description>\n`
    if (project.longDescription) {
      xml += `    <longDescription>${project.longDescription}</longDescription>\n`
    }
    xml += '    <technologies>\n'
    project.technologies.forEach((tech: string) => {
      xml += `      <technology>${tech}</technology>\n`
    })
    xml += '    </technologies>\n'
    xml += `    <url>${project.url}</url>\n`
    xml += `    <featured>${project.featured}</featured>\n`
    if (project.screenshot) {
      xml += `    <screenshot>${project.screenshot}</screenshot>\n`
    }
    if (project.featuredImage) {
      xml += `    <featuredImage>${project.featuredImage}</featuredImage>\n`
    }
    if (project.commands && project.commands.length > 0) {
      xml += '    <commands>\n'
      project.commands.forEach((command: string) => {
        xml += `      <command>${command}</command>\n`
      })
      xml += '    </commands>\n'
    }
    xml += '  </project>\n'
  })
  
  xml += '</projects>'
  return xml
} 