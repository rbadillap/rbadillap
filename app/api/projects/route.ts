import { NextResponse } from "next/server"

// This would typically come from a database or CMS
const projects = [
  {
    id: "project-1",
    title: "Cloud-Native Application",
    description: "Microservices architecture deployed on Kubernetes",
    technologies: ["Go", "Kubernetes", "Terraform"],
    url: "https://github.com/rbadillap/cloud-native-app",
    featured: true,
  },
  {
    id: "project-2",
    title: "DevOps Pipeline Automation",
    description: "End-to-end CI/CD pipeline with GitOps workflow",
    technologies: ["GitHub Actions", "ArgoCD", "Kubernetes"],
    url: "https://github.com/rbadillap/devops-automation",
    featured: true,
  },
  {
    id: "project-3",
    title: "Data Analytics Platform",
    description: "Real-time data processing and visualization platform",
    technologies: ["Python", "Kafka", "Grafana"],
    url: "https://github.com/rbadillap/data-analytics",
    featured: false,
  },
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")
  const technology = searchParams.get("technology")
  
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
  technologies: string[];
  url: string;
  featured: boolean;
}

function generateXML(projects: Project[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<projects>\n'
  
  projects.forEach(project => {
    xml += '  <project>\n'
    xml += `    <id>${project.id}</id>\n`
    xml += `    <title>${project.title}</title>\n`
    xml += `    <description>${project.description}</description>\n`
    xml += '    <technologies>\n'
    project.technologies.forEach((tech: string) => {
      xml += `      <technology>${tech}</technology>\n`
    })
    xml += '    </technologies>\n'
    xml += `    <url>${project.url}</url>\n`
    xml += `    <featured>${project.featured}</featured>\n`
    xml += '  </project>\n'
  })
  
  xml += '</projects>'
  return xml
} 