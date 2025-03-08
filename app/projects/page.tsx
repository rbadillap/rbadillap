import { RootLayout } from "@/components/layout/RootLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, GitBranch } from "lucide-react"
import Link from "next/link"

// This would typically be fetched from an API or database
const projects = [
  {
    id: "project-1",
    title: "Cloud-Native Application",
    description: "Microservices architecture deployed on Kubernetes with automatic scaling and fault tolerance. Implemented using Go for high performance and efficiency.",
    longDescription: "A complete microservices application built with cloud-native principles in mind. The system leverages Kubernetes for orchestration, Istio for service mesh, and Prometheus for monitoring. Each microservice is containerized and deployed with a GitOps workflow.",
    technologies: ["Go", "Kubernetes", "Terraform", "Docker", "Istio"],
    url: "https://github.com/rbadillap/cloud-native-app",
    featured: true,
  },
  {
    id: "project-2",
    title: "DevOps Pipeline Automation",
    description: "End-to-end CI/CD pipeline with GitOps workflow for Kubernetes deployments. Integrates testing, security scanning, and deployment automation.",
    longDescription: "A comprehensive DevOps pipeline that implements CI/CD best practices with a focus on security and reliability. Features include automated testing, vulnerability scanning, infrastructure-as-code with Terraform, and GitOps-based deployments to Kubernetes clusters.",
    technologies: ["GitHub Actions", "ArgoCD", "Kubernetes", "Terraform", "Helm"],
    url: "https://github.com/rbadillap/devops-automation",
    featured: true,
  },
  {
    id: "project-3",
    title: "Data Analytics Platform",
    description: "Real-time data processing and visualization platform built on a scalable architecture. Processes millions of events per day.",
    longDescription: "A high-performance data analytics platform that ingests, processes, and visualizes large volumes of real-time data. Built on a streaming architecture using Kafka for event processing, with a Python backend for data transformation and a responsive frontend for visualization.",
    technologies: ["Python", "Kafka", "Grafana", "PostgreSQL", "Redis"],
    url: "https://github.com/rbadillap/data-analytics",
    featured: false,
  },
  {
    id: "project-4",
    title: "AI-Powered Content Recommendation",
    description: "Machine learning system that analyzes user behavior to provide personalized content recommendations.",
    longDescription: "An intelligent recommendation engine that leverages machine learning to analyze user behavior patterns and content metadata. The system provides highly relevant personalized recommendations that improve engagement metrics by over 30%.",
    technologies: ["Python", "TensorFlow", "AWS Lambda", "DynamoDB"],
    url: "https://github.com/rbadillap/ai-recommender",
    featured: true,
  },
  {
    id: "project-5",
    title: "Serverless API Gateway",
    description: "Scalable API gateway built on serverless architecture with automatic authentication and rate limiting.",
    longDescription: "A modern API gateway implemented using serverless technologies. Features include JWT authentication, rate limiting, request validation, and detailed analytics. Automatically scales based on traffic and has built-in resilience patterns.",
    technologies: ["AWS Lambda", "API Gateway", "Node.js", "Terraform"],
    url: "https://github.com/rbadillap/serverless-api",
    featured: false,
  },
]

export default function ProjectsPage() {
  return (
    <RootLayout>
      <div className="flex flex-col space-y-12">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of my projects demonstrating expertise in software development, DevOps, cloud architecture, and AI.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.featured && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
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
              </CardFooter>
            </Card>
          ))}
        </section>

        <section className="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">API Access</h2>
          <p className="text-muted-foreground mb-4">
            All project data is available through our API. This allows for interoperability with other systems.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <code>
              GET /api/projects
            </code>
          </div>
          <div className="mt-4">
            <Link
              href="/api"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              View API Documentation
            </Link>
          </div>
        </section>
      </div>
    </RootLayout>
  )
} 