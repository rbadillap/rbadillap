import { home } from "#content"

import { NewsletterForm } from "@/components/newsletter-form"
import { Section } from "@/components/section"

export function NewsletterSection({ className }: { className?: string }) {
  return (
    <Section label="Newsletter" className={className}>
      <div className="space-y-5">
        <p>{home.newsletterText}</p>
        <NewsletterForm />
      </div>
    </Section>
  )
}
