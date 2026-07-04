import Link from "next/link"

import { Logomark } from "@/components/logomark"
import { NewsletterForm } from "@/components/newsletter-form"
import { SynerMark } from "@/components/syner-mark"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Logomark className="mb-7 text-foreground-strong" />
          <h1 className="text-base font-medium text-foreground-strong">Ronny Badilla</h1>
          <p className="mt-0.5 text-sm text-foreground-muted">Design / DevOps / AI Engineer</p>
        </header>

        <div className="relative">
          {/* the spine: one continuous base connecting every section node */}
          <span
            className="absolute bottom-[56px] left-[2px] top-[96px] w-px bg-border"
            aria-hidden="true"
          />

        <Section label="Now" className="fade-up fade-up-1">
          <div className="space-y-4">
            <p>
              I&apos;ve worked for years helping build great products, from startups to
              enterprises. Now it&apos;s my turn to achieve my dreams.
            </p>
            <p>
              Building{" "}
              <ExternalLink href="https://syner.app">
                <SynerMark className="mr-[5px] inline-block size-[15px] align-[-2px]" />
                Syner
              </ExternalLink>{" "}
              — the Agentic Operating System.
            </p>
          </div>
        </Section>

        <Section label="Experience" className="fade-up fade-up-2">
          <div className="space-y-3.5">
            <ExperienceItem company="SynerOps" role="Founder" year="2025" />
            <ExperienceItem company="Automattic" role="Platform Engineer" year="2023" />
            <ExperienceItem company="FedRAMP.gov" role="Solutions Architect" year="2022" />
          </div>
        </Section>

        <Section label="What I Do" className="fade-up fade-up-3">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground-strong">Cloud &amp; DevOps</h3>
              <p>AWS architecture, infrastructure automation, and CI/CD pipelines.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground-strong">AI Solutions</h3>
              <p>LLM integration, RAG systems, and AI-powered tools.</p>
            </div>
          </div>
        </Section>

        <Section label="Open Source" className="fade-up fade-up-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground-strong">
                <ExternalLink href="https://registry.directory">registry.directory</ExternalLink>
              </h3>
              <p>Discover and explore UI registries.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground-strong">
                <ExternalLink href="https://pastecn.com">pastecn.com</ExternalLink>
              </h3>
              <p>pastebin + shadcn = pastecn.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground-strong">
                registry.studio
                <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-foreground-muted">
                  Coming soon
                </span>
              </h3>
              <p>Advanced visual registry builder.</p>
            </div>
          </div>
        </Section>

        <Section label="Newsletter" className="fade-up fade-up-5">
          <div className="space-y-5">
            <p>Occasional notes on design, infrastructure, and AI. No spam.</p>
            <NewsletterForm />
          </div>
        </Section>

        <footer className="fade-up fade-up-6 mt-[88px]">
          <SectionLabel label="Elsewhere" />
          <nav className="flex gap-6 pl-[15px] text-sm">
            <FooterLink href="https://x.com/rbadillap">X</FooterLink>
            <FooterLink href="https://github.com/rbadillap">GitHub</FooterLink>
            <FooterLink href="https://linkedin.com/in/rbadillap">LinkedIn</FooterLink>
            <FooterLink href="mailto:info@ronnybadilla.com">Mail</FooterLink>
          </nav>
        </footer>
        </div>

        {/* the landing: the page closes where the symbol lands */}
        <div className="mt-[72px] flex items-center" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="size-[5px] rounded-full bg-foreground-muted" />
        </div>
      </div>
    </main>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-7 flex items-center gap-2.5" aria-hidden="true">
      <span className="size-[5px] shrink-0 rounded-full bg-foreground-strong" />
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-foreground-muted">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

function Section({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`mt-[88px] ${className ?? ""}`} aria-label={label}>
      <SectionLabel label={label} />
      <div className="pl-[15px]">{children}</div>
    </section>
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-border text-foreground-strong transition-colors hover:border-foreground-strong"
    >
      {children}
    </Link>
  )
}

function ExperienceItem({ company, role, year }: { company: string; role: string; year: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <span className="font-medium text-foreground-strong">{company}</span>
        <span className="ml-2">{role}</span>
      </div>
      <span className="font-mono text-xs text-foreground-muted">{year}</span>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="-mx-1 -my-2 px-1 py-2 text-foreground transition-colors hover:text-foreground-strong"
    >
      {children}
    </Link>
  )
}
