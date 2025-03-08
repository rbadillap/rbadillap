import { NextResponse } from "next/server"

// CV data, in a real app this would come from a database
const cvData = {
  name: "Ronny Badilla",
  title: "Software Developer & DevOps Engineer",
  summary: "Experienced software developer and DevOps engineer with a focus on creating modern, interoperable systems with clean design and excellent developer experience.",
  skills: [
    {
      category: "Software Development",
      items: ["JavaScript/TypeScript", "React", "Next.js", "Node.js", "Go", "Python"]
    },
    {
      category: "DevOps & Cloud",
      items: ["Kubernetes", "Docker", "Terraform", "AWS", "GCP", "CI/CD Pipelines"]
    },
    {
      category: "Architecture",
      items: ["Microservices", "Serverless", "Event-Driven", "API Design", "System Integration"]
    }
  ],
  experience: [
    {
      title: "Lead Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description: "Leading development of cloud-native applications with a focus on Kubernetes and microservices architecture.",
      achievements: [
        "Migrated legacy monolith to microservices",
        "Reduced deployment time by 80%",
        "Implemented GitOps workflow"
      ]
    },
    {
      title: "DevOps Engineer",
      company: "CloudSys Solutions",
      period: "2017 - 2020",
      description: "Designed and implemented CI/CD pipelines and infrastructure automation for enterprise clients.",
      achievements: [
        "Automated deployment processes",
        "Implemented infrastructure as code",
        "Reduced operational costs by 35%"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Engineering",
      institution: "Tech University",
      year: "2017"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      year: "2015"
    }
  ],
  contact: {
    email: "info@ronnybadilla.com",
    github: "https://github.com/rbadillap",
    linkedin: "https://linkedin.com/in/ronnybadilla"
  }
}

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const format = searchParams.get("format") || "json"
  
  switch (format) {
    case "json":
      return NextResponse.json(cvData)
    case "pdf":
      // In a real implementation, we would generate a PDF
      // For now, we'll just return a mock response
      return new NextResponse("PDF generation not implemented", {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=ronny-badilla-cv.pdf"
        },
      })
    case "markdown":
      const markdown = generateMarkdown(cvData)
      return new NextResponse(markdown, {
        headers: {
          "Content-Type": "text/markdown",
          "Content-Disposition": "attachment; filename=ronny-badilla-cv.md"
        },
      })
    default:
      return NextResponse.json(
        { error: "Unsupported format" },
        { status: 400 }
      )
  }
}

// Helper function to generate Markdown
function generateMarkdown(data: typeof cvData): string {
  let markdown = `# ${data.name}\n\n`
  markdown += `## ${data.title}\n\n`
  markdown += `${data.summary}\n\n`
  
  markdown += `## Skills\n\n`
  data.skills.forEach(skillGroup => {
    markdown += `### ${skillGroup.category}\n\n`
    markdown += skillGroup.items.map(item => `- ${item}`).join('\n') + '\n\n'
  })
  
  markdown += `## Experience\n\n`
  data.experience.forEach(job => {
    markdown += `### ${job.title} | ${job.company}\n\n`
    markdown += `**${job.period}**\n\n`
    markdown += `${job.description}\n\n`
    markdown += job.achievements.map(achievement => `- ${achievement}`).join('\n') + '\n\n'
  })
  
  markdown += `## Education\n\n`
  data.education.forEach(edu => {
    markdown += `### ${edu.degree}\n\n`
    markdown += `${edu.institution}, ${edu.year}\n\n`
  })
  
  markdown += `## Contact\n\n`
  markdown += `- Email: ${data.contact.email}\n`
  markdown += `- GitHub: ${data.contact.github}\n`
  markdown += `- LinkedIn: ${data.contact.linkedin}\n`
  
  return markdown
} 