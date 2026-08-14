import Link from "next/link"
import { experience, home, projects } from "#content"

import { ExternalLink } from "@/components/external-link"
import { ContentMarkdown } from "@/components/markdown"
import { NewsletterForm } from "@/components/newsletter-form"
import { Mark } from "@/components/mark"
import { Meta } from "@/components/meta"
import { Node } from "@/components/node"
import { Rule } from "@/components/rule"

const sortedProjects = [...projects].sort((a, b) => a.order - b.order)
const sortedExperience = [...experience].sort((a, b) => b.year.localeCompare(a.year))

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Mark className="mb-7 text-primary" />
          <h1 className="text-(length:--text-md) font-medium text-primary">{home.name}</h1>
          <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">{home.tagline}</p>
        </header>

        <div className="relative">
          {/* the spine: one continuous base connecting every section node */}
          <Rule
            orientation="vertical"
            className="absolute bottom-[56px] left-[2px] top-[96px]"
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
                <h3 className="font-medium text-primary">{service.title}</h3>
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
                  className={`font-medium ${project.active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {project.active && project.url ? (
                    <ExternalLink href={project.url}>{project.title}</ExternalLink>
                  ) : (
                    project.title
                  )}
                  {!project.active && (
                    <Meta className="ml-2 font-normal tracking-[0.12em]">
                      Coming soon
                    </Meta>
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
          <nav className="flex gap-6 pl-[15px] text-(length:--text-sm)">
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
          <Rule className="flex-1" />
          <Node className="bg-muted-foreground" />
        </div>
      </div>
    </main>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-7 flex items-center gap-2.5" aria-hidden="true">
      <Node />
      <Meta>{label}</Meta>
      <Rule className="flex-1" />
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
        <span className="font-medium text-primary">{company}</span>
        <span className="ml-2">{role}</span>
      </div>
      <Meta variant="data">{year}</Meta>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="-mx-1 -my-2 px-1 py-2 text-foreground transition-colors hover:text-primary"
    >
      {children}
    </Link>
  )
}
