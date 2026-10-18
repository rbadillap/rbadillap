import type { Metadata } from "next"
import Link from "next/link"
import { home } from "#content"

import { textLinkClassName } from "@/components/external-link"
import { DraftTag } from "@/components/draft-tag"
import { Mark } from "@/components/mark"
import { Meta } from "@/components/meta"
import { NewsletterSection } from "@/components/newsletter-section"
import { Landing, Section } from "@/components/section"
import { SiteFooter } from "@/components/site-footer"
import { postDate, postPath, posts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Writing",
  description: `Writing by ${home.name}.`,
  openGraph: {
    title: "Writing",
    description: `Writing by ${home.name}.`,
    url: "https://ronnybadilla.com/writing",
    siteName: "Ronny Badilla",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing",
    description: `Writing by ${home.name}.`,
  },
}

export default function WritingPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Link href="/" aria-label="Ronny Badilla" className="mb-7 inline-block text-primary">
            <Mark />
          </Link>
          <h1 className="text-(length:--text-md) font-medium text-primary">Writing</h1>
          <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">{home.name}</p>
        </header>

        <Section label="Posts" className="fade-up fade-up-1">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Nothing published yet.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.slug}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-medium text-primary">
                      <Link href={postPath(post)} className={textLinkClassName}>
                        {post.title}
                      </Link>
                      {post.draft && <DraftTag />}
                    </h2>
                    <Meta variant="data" className="shrink-0">
                      <time dateTime={postDate(post)}>{postDate(post)}</time>
                    </Meta>
                  </div>
                  <p>{post.description}</p>
                </article>
              ))}
            </div>
          )}
        </Section>

        <NewsletterSection className="fade-up fade-up-2" />
        <SiteFooter className="fade-up fade-up-3" />

        <Landing />
      </div>
    </main>
  )
}
