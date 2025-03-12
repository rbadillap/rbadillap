import { NextResponse } from "next/server"
import { projects } from "./data"

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