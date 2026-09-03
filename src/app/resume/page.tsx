import type { Metadata } from "next"
import Link from "next/link"
import { resume } from "#content"

import { ExternalLink, textLinkClassName } from "@/components/external-link"
import { ContentMarkdown } from "@/components/markdown"
import { Mark } from "@/components/mark"
import { Meta } from "@/components/meta"
import { Landing, Section } from "@/components/section"
import { SiteFooter } from "@/components/site-footer"

// Reachable only by exact link: no indexing, no following, no cached copies.
// The X-Robots-Tag header in next.config.ts covers the OG image as well.
export const metadata: Metadata = {
  title: "Resume",
  description: resume.positioning,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: `${resume.name} · Resume`,
    description: resume.positioning,
    url: "https://ronnybadilla.com/resume",
    siteName: "Ronny Badilla",
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} · Resume`,
    description: resume.positioning,
  },
}

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Link href="/" aria-label="Ronny Badilla" className="mb-7 inline-block text-primary">
            <Mark />
          </Link>
          <h1 className="text-(length:--text-md) font-medium text-primary">{resume.name}</h1>
          <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">
            {resume.positioning}
          </p>
        </header>

        <Section label="Summary" className="fade-up fade-up-1">
          <div className="space-y-4">
            <ContentMarkdown>{resume.summary}</ContentMarkdown>
          </div>
        </Section>

        <Section label="Expertise" className="fade-up fade-up-2">
          <dl className="space-y-4">
            {resume.expertise.map((row) => (
              <div key={row.key}>
                <dt className="font-medium text-primary">{row.key}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Experience" className="fade-up fade-up-3">
          <div className="space-y-9">
            {resume.experience.map((job) => (
              <article key={`${job.organization}-${job.period}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-primary">{job.organization}</h3>
                  <Meta variant="data" className="shrink-0">
                    {job.period}
                  </Meta>
                </div>
                <p className="text-muted-foreground">{job.role}</p>
                <DashList className="mt-3" items={job.bullets} />
              </article>
            ))}
          </div>
        </Section>

        <Section label="Open source" className="fade-up fade-up-4">
          <div className="space-y-6">
            {resume.openSource.map((item) => (
              <div key={item.href}>
                <h3 className="font-medium text-primary">
                  {item.href.startsWith("/") ? (
                    <Link href={item.href} className={textLinkClassName}>
                      {item.label}
                    </Link>
                  ) : (
                    <ExternalLink href={item.href}>{item.label}</ExternalLink>
                  )}
                </h3>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <SiteFooter className="fade-up fade-up-5" />

        <Landing />
      </div>
    </main>
  )
}

/** The dash-bullet list of the published grammar: a 5px dash in muted, body-size items. */
function DashList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className ?? ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-[5px] before:bg-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
