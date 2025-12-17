import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Link from "next/link"
import { ColorControl } from "@/components/color-control"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ColorControl />

      <div className="mx-auto max-w-xl px-6 py-16 md:py-24">
        <header className="mb-16">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarImage src="/rbadillap.png" alt="Ronny Badilla" />
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-medium text-foreground-strong tracking-wide">Ronny Badilla</h1>
              <p className="text-foreground leading-relaxed tracking-wide mt-0.5">Design / DevOps / AI Engineer</p>
            </div>
          </div>
        </header>

        <section className="mb-16 space-y-4">
          <p className="leading-relaxed">
            I&apos;ve worked for years helping build great products, from startups to enterprises. Now it&apos;s my turn to achieve my dreams.
          </p>
          <p className="leading-relaxed">
            Building{" "}
            <Link
              href="https://syner.app"
              target="_blank"
              className="text-foreground-strong hover:text-primary transition-colors underline underline-offset-4"
            >
              Syner
            </Link>
            —the Agentic Operating System.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-xs uppercase tracking-widest text-foreground-muted">Experience</h2>
          <div className="space-y-4">
            <ExperienceItem company="SynerOps" role="Founder" year="2025" />
            <ExperienceItem company="Automattic" role="Platform Engineer" year="2023" />
            <ExperienceItem company="FedRAMP.gov" role="Solutions Architect" year="2022" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-xs uppercase tracking-widest text-foreground-muted">What I Do</h2>
          <div className="space-y-4">
            <p className="leading-relaxed">
              <span className="text-foreground-strong">Cloud & DevOps</span>
              <span className="ml-2">AWS architecture, infrastructure automation, and CI/CD pipelines.</span>
            </p>
            <p className="leading-relaxed">
              <span className="text-foreground-strong">AI Solutions</span>
              <span className="ml-2">LLM integration, RAG systems, and AI-powered tools.</span>
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-border">
          <div className="flex flex-wrap gap-6 text-base">
            <Link
              href="https://x.com/rbadillap"
              className="text-foreground-muted hover:text-foreground-strong transition-colors"
              target="_blank"
            >
              X
            </Link>
            <Link
              href="https://github.com/rbadillap"
              className="text-foreground-muted hover:text-foreground-strong transition-colors"
              target="_blank"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/rbadillap"
              className="text-foreground-muted hover:text-foreground-strong transition-colors"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:info@ronnybadilla.com"
              className="text-foreground-muted hover:text-foreground-strong transition-colors"
            >
              Mail
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}

function ExperienceItem({ company, role, year }: { company: string; role: string; year: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <span className="text-foreground-strong">{company}</span>
        <span className="ml-2 text-foreground-muted">{role}</span>
      </div>
      <span className="text-foreground-muted text-sm">{year}</span>
    </div>
  )
}
