import type { Metadata } from "next"
import Link from "next/link"
import { checklist, checklistSections } from "#content"

import {
  Checklist,
  ChecklistItem,
  ChecklistReset,
  ChecklistSection,
  CopyPrompt,
  ShowMore,
} from "@/components/checklist"
import { ContentMarkdown, InlineMarkdown } from "@/components/markdown"
import { Mark } from "@/components/mark"
import { NewsletterSection } from "@/components/newsletter-section"
import { Landing, Section } from "@/components/section"
import { SiteFooter } from "@/components/site-footer"

const sections = [...checklistSections].sort((a, b) => a.order - b.order)

// The prompt an agent receives: the preamble, then the whole checklist as
// markdown — the same items the reader sees, in the agent's language.
const promptBody = sections
  .map((s) => [`## ${s.title}`, ...s.items.map((i) => `- ${i}`)].join("\n"))
  .join("\n\n")
const promptText = `${checklist.prompt.trim()}\n\n${promptBody}`

const itemId = (slug: string, index: number) => `${slug}:${index}`

export const metadata: Metadata = {
  title: checklist.title,
  description: checklist.tagline,
  openGraph: {
    title: checklist.title,
    description: checklist.tagline,
    url: "https://ronnybadilla.com/checklist",
    siteName: "Ronny Badilla",
  },
  twitter: {
    card: "summary_large_image",
    title: checklist.title,
    description: checklist.tagline,
  },
}

export default function ChecklistPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Link href="/" aria-label="Ronny Badilla" className="mb-7 inline-block text-primary">
            <Mark />
          </Link>
          <h1 className="text-(length:--text-md) font-medium text-primary">{checklist.title}</h1>
          <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">
            {checklist.tagline}
          </p>
        </header>

        <Checklist storageKey="checklist">
          <Section
            label="Prompt"
            className="fade-up fade-up-1"
            aside={<CopyPrompt text={promptText} />}
          >
            <div className="space-y-4 border-l-2 border-primary pl-4">
              <ContentMarkdown>{checklist.prompt}</ContentMarkdown>
              <ShowMore>
                <pre className="whitespace-pre-wrap font-mono text-(length:--text-xs) text-muted-foreground">
                  {promptBody}
                </pre>
              </ShowMore>
            </div>
          </Section>

          {sections.map((section, i) => (
            <ChecklistSection
              key={section.slug}
              label={section.title}
              ids={section.items.map((_, j) => itemId(section.slug, j))}
              className={`fade-up fade-up-${Math.min(i + 2, 6)}`}
            >
              {section.items.map((item, j) => (
                <ChecklistItem key={itemId(section.slug, j)} id={itemId(section.slug, j)}>
                  <InlineMarkdown>{item}</InlineMarkdown>
                </ChecklistItem>
              ))}
            </ChecklistSection>
          ))}

          <div className="mt-7 flex justify-end">
            <ChecklistReset />
          </div>
        </Checklist>

        <NewsletterSection className="fade-up fade-up-5" />
        <SiteFooter className="fade-up fade-up-6" />

        <Landing />
      </div>
    </main>
  )
}
