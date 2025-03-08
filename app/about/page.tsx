import { RootLayout } from "@/components/layout/RootLayout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <RootLayout>
      <div className="flex flex-col space-y-12 max-w-3xl">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground">
            I&apos;m Ronny Badilla, a passionate software developer, DevOps engineer, and cloud architect with a focus on creating modern, interoperable systems.
          </p>
        </section>

        <section className="prose dark:prose-invert max-w-none">
          <p>
            With over a decade of experience in software development, I&apos;ve evolved my practice to embrace the intersection of development, operations, and cloud infrastructure. My approach combines technical excellence with a focus on user experience and system design.
          </p>
          
          <p>
            I believe strongly in the power of interoperability - creating systems that communicate effectively with other tools and services. This philosophy extends to my personal website, which features a comprehensive API and follows modern design principles.
          </p>

          <h2>Professional Journey</h2>
          
          <p>
            My career has spanned roles in software development, DevOps engineering, and cloud architecture across various industries. I&apos;ve worked with startups and enterprise organizations, helping them build scalable, maintainable systems that serve their business goals.
          </p>
          
          <p>
            Key milestones in my career include:
          </p>
          
          <ul>
            <li>Leading the migration of legacy applications to cloud-native architectures</li>
            <li>Implementing GitOps workflows for continuous delivery pipelines</li>
            <li>Designing and building data processing systems that handle millions of events daily</li>
            <li>Mentoring development teams on DevOps practices and cloud architecture</li>
          </ul>

          <h2>Technical Expertise</h2>
          
          <p>
            My technical toolkit spans multiple domains:
          </p>
          
          <h3>Software Development</h3>
          <ul>
            <li>Languages: JavaScript/TypeScript, Python, Go</li>
            <li>Frameworks: React, Next.js, Express, FastAPI</li>
            <li>Testing: Jest, Cypress, Pytest</li>
          </ul>
          
          <h3>DevOps & Infrastructure</h3>
          <ul>
            <li>Container Orchestration: Kubernetes, Docker Swarm</li>
            <li>CI/CD: GitHub Actions, GitLab CI, Jenkins</li>
            <li>Configuration Management: Terraform, Ansible, Pulumi</li>
            <li>Observability: Prometheus, Grafana, ELK Stack</li>
          </ul>
          
          <h3>Cloud Platforms</h3>
          <ul>
            <li>AWS: EC2, S3, Lambda, EKS, DynamoDB</li>
            <li>GCP: GKE, Cloud Functions, BigQuery, Pub/Sub</li>
            <li>Azure: AKS, Azure Functions, Cosmos DB</li>
          </ul>
        </section>

        <section className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <Button asChild>
            <Link href="/projects">
              View My Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </section>
      </div>
    </RootLayout>
  )
} 