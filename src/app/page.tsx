import Link from "next/link"
import { experience, home, projects } from "#content"

import { AgentPortal } from "@/components/agent-portal"
import { ExternalLink, textLinkClassName } from "@/components/external-link"
import { ContentMarkdown } from "@/components/markdown"
import { NewsletterSection } from "@/components/newsletter-section"
import { Mark } from "@/components/mark"
import { Meta } from "@/components/meta"
import { Landing, Section } from "@/components/section"
import { SiteFooter } from "@/components/site-footer"

const sortedProjects = [...projects].sort((a, b) => a.order - b.order)
const sortedExperience = [...experience].sort(
  (a, b) => b.year.localeCompare(a.year) || a.order - b.order,
)

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <AgentPortal
          mark={<Mark className="text-primary" />}
          header={
            <>
              <h1 className="text-(length:--text-md) font-medium text-primary">{home.name}</h1>
              <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">{home.tagline}</p>
            </>
          }
        >
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
                      project.url.startsWith("/") ? (
                        <Link href={project.url} className={textLinkClassName}>
                          {project.title}
                        </Link>
                      ) : (
                        <ExternalLink href={project.url}>{project.title}</ExternalLink>
                      )
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

          <NewsletterSection className="fade-up fade-up-5" />
          <SiteFooter className="fade-up fade-up-6" />
        </AgentPortal>

        <Landing />
      </div>
    </main>
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
