import { NextResponse } from "next/server"

// Define proper interfaces for CV data
interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  description?: string;
  achievements?: string[];
}

interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

interface CVData {
  name: string;
  title: string;
  summary: string;
  coreCompetencies: string[];
  keyAchievements: string[];
  experience: ExperienceEntry[];
  contact: ContactInfo;
}

// CV data, in a real app this would come from a database
const cvData: CVData = {
  name: "Ronny Badilla Pastrano",
  title: "Cloud & AI Engineer | Full-Stack | DevOps | Architecture",
  summary: "20 years of cross-functional expertise in SaaS, Fintech, Blockchain, and consultancy. Specialized in integrating cloud, generative AI, and compliance frameworks (FedRAMP/SOC 2). Experienced in cloud migrations, modernizing architectures, prototyping AI tools, and internal tools development.",

  coreCompetencies: [
    "AWS",
    "Generative AI",
    "FedRAMP/SOC 2 Compliance",
    "Serverless Architectures",
    "LLM Integration",
    "Cloud Migration",
    "Cloud Optimization",
    "Microservices",
    "AI Workflow Automation"
  ],

  keyAchievements: [
    "Prototyped AI-driven internal tools for 100-1500 employees",
    "Led cloud migration to AWS for Automattic",
    "Implemented cloud observability solutions"
  ],

  experience: [
    {
      title: "Sr DevOps Architect",
      company: "TransUnion",
      period: "2024 - Present"
    },
    {
      title: "Platform Engineer",
      company: "Automattic",
      period: "2020 - 2022"
    },
    {
      title: "Global Solutions Architect Lead",
      company: "SoftwareONE",
      period: "2018 - 2020"
    }
  ],

  contact: {
    email: "info@ronnybadilla.com",
    github: "https://github.com/rbadillap",
    linkedin: "https://linkedin.com/in/rbadillap",
    twitter: "https://x.com/rbadillap"
  }
};

export async function GET(request: Request): Promise<NextResponse> {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const format = searchParams.get("format") || "json"
  
  switch (format) {
    case "json":
      return NextResponse.json(cvData)
    case "pdf":
      // Redirect to the static PDF file
      return NextResponse.redirect(new URL('/assets/resume.pdf', request.url))
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

/**
 * Generates a Markdown representation of the CV data
 * @param data The CV data to convert to Markdown
 * @returns A formatted Markdown string
 */
function generateMarkdown(data: CVData): string {
  let markdown = `# ${data.name}\n\n`
  markdown += `## ${data.title}\n\n`
  markdown += `${data.summary}\n\n`
  
  markdown += `## Core Competencies\n\n`
  markdown += data.coreCompetencies.map((item: string) => `- ${item}`).join('\n') + '\n\n'
  
  markdown += `## Key Achievements\n\n`
  markdown += data.keyAchievements.map((achievement: string) => `- ${achievement}`).join('\n') + '\n\n'
  
  markdown += `## Experience\n\n`
  data.experience.forEach((job: ExperienceEntry) => {
    markdown += `### ${job.title} | ${job.company}\n\n`
    markdown += `**${job.period}**\n\n`
    
    // Only add description and achievements if they exist
    if (job.description) {
      markdown += `${job.description}\n\n`
    }
    
    if (job.achievements && job.achievements.length > 0) {
      markdown += job.achievements.map((achievement: string) => `- ${achievement}`).join('\n') + '\n\n'
    }
  })
  
  markdown += `## Contact\n\n`
  markdown += `- Email: ${data.contact.email}\n`
  markdown += `- GitHub: ${data.contact.github}\n`
  markdown += `- LinkedIn: ${data.contact.linkedin}\n`
  if (data.contact.twitter) {
    markdown += `- Twitter/X: ${data.contact.twitter}\n`
  }
  
  return markdown
} 