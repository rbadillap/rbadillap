import Link from "next/link"
import { experience, home, projects } from "#content"

import { ExternalLink } from "@/components/external-link"
import { Logomark } from "@/components/logomark"
import { ContentMarkdown } from "@/components/markdown"
import { NewsletterForm } from "@/components/newsletter-form"

const sortedProjects = [...projects].sort((a, b) => a.order - b.order)
const sortedExperience = [...experience].sort((a, b) => b.year.localeCompare(a.year))

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Logomark className="mb-7 text-foreground-strong" />
          <h1 className="text-base font-medium text-foreground-strong">{home.name}</h1>
          <p className="mt-0.5 text-sm text-foreground-muted">{home.tagline}</p>
        </header>

        <div className="relative">
          {/* the spine: one continuous base connecting every section node */}
          <span
            className="absolute bottom-[56px] left-[2px] top-[96px] w-px bg-border"
            aria-hidden="true"
          />

        <Section label="Now" className="fade-up fade-up-1">
          <div className="space-y-4">
            <ContentMarkdown>{home.now}</ContentMarkdown>
          </div>
        </Section>

        <Section label="Experience" className="fade-up fade-up-2">
          <div className="space-y-3.5">
            {sortedExperience.map((item) => (
              <ExperienceItem
                key={item.company}
                company={item.company}
                role={item.role}
                year={item.year}
              />
            ))}
          </div>
        </Section>

        <Section label="What I Do" className="fade-up fade-up-3">
          <div className="space-y-6">
            {home.services.map((service) => (
              <div key={service.title}>
                <h3 className="font-medium text-foreground-strong">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Open Source" className="fade-up fade-up-4">
          <div className="space-y-6">
            {sortedProjects.map((project) => (
              <div key={project.title}>
                <h3
                  className={`font-medium ${project.active ? "text-foreground-strong" : "text-foreground-muted"}`}
                >
                  {project.active && project.url ? (
                    <ExternalLink href={project.url}>{project.title}</ExternalLink>
                  ) : (
                    project.title
                  )}
                  {!project.active && (
                    <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-foreground-muted">
                      Coming soon
                    </span>
                  )}
                </h3>
                <ContentMarkdown muted={!project.active}>{project.description}</ContentMarkdown>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Newsletter" className="fade-up fade-up-5">
          <div className="space-y-5">
            <p>{home.newsletterText}</p>
            <NewsletterForm />
          </div>
        </Section>

        <footer className="fade-up fade-up-6 mt-[88px]">
          <SectionLabel label="Elsewhere" />
          <nav className="flex gap-6 pl-[15px] text-sm">
            {home.elsewhere.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
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
