import { RootLayout } from "@/components/layout/RootLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, GitBranch, Terminal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Import the project data directly to avoid API call during build
import { projects as projectsData } from "@/app/api/projects/data"

// Define the Project type
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

export default async function ProjectsPage() {
  // Use the imported data directly instead of fetching from the API during build
  const projects: Project[] = projectsData;

  return (
    <RootLayout>
      <div className="flex flex-col space-y-12">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Welcome to my digital workshop — where ideas come to life through code. Here you&apos;ll find tools I&apos;ve crafted that solve my problems and, hopefully, yours someday 😉
          </p>
        </section>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Terminal size={48} className="text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              I&apos;m currently building more projects to showcase. Check back soon to see what I&apos;m working on!
            </p>
          </div>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Project</h2>
            {projects.filter((p: Project) => p.featured).map((project: Project) => (
              <Card key={project.id} className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <GitBranch className="mr-2 h-4 w-4" />
                      View on GitHub
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </div>
                  <CardDescription className="mt-2 text-lg">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project detail content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column - Project details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Overview</h3>
                        <p className="text-muted-foreground">
                          {project.longDescription}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-muted text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {project.commands && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Commands</h3>
                          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm">
                              {project.commands.map((cmd: string, idx: number) => (
                                <div key={idx} className="py-0.5">{cmd}</div>
                              ))}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Right column - Screenshot/image */}
                    <div className="flex justify-center items-center">
                      <div className="rounded-lg overflow-hidden border border-muted bg-muted/30 p-1 h-64 flex items-center justify-center">
                        {project.screenshot ? (
                          <Image 
                            src={project.screenshot}
                            alt={`Screenshot of ${project.title}`}
                            width={500}
                            height={300}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-6">
                            <Terminal size={48} className="text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                              Screenshot coming soon
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </RootLayout>
  )
} 