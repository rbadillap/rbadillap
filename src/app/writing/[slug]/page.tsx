import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DraftTag } from "@/components/draft-tag"
import { Mark } from "@/components/mark"
import { ArticleMarkdown } from "@/components/markdown"
import { Meta } from "@/components/meta"
import { NewsletterSection } from "@/components/newsletter-section"
import { Landing, Section } from "@/components/section"
import { SiteFooter } from "@/components/site-footer"
import { getPost, postDate, postPath, posts, postUrl } from "@/lib/posts"

// Only the posts this build publishes exist; any other slug, drafts in
// production included, is a 404 (src/lib/drafts.ts).
export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postPath(post),
      // the same post as raw markdown, for agents
      types: { "text/markdown": `${postPath(post)}.md` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl(post),
      siteName: "Ronny Badilla",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[560px] px-6 pb-16 pt-24">
        <header className="fade-up">
          <Link href="/" aria-label="Ronny Badilla" className="mb-7 inline-block text-primary">
            <Mark />
          </Link>
          <h1 className="text-(length:--text-md) font-medium text-primary">
            {post.title}
            {post.draft && <DraftTag />}
          </h1>
          <p className="mt-0.5 text-(length:--text-sm) text-muted-foreground">
            {post.description}
          </p>
        </header>

        <Section
          label="Writing"
          className="fade-up fade-up-1"
          aside={
            <Meta variant="data">
              <time dateTime={postDate(post)}>{postDate(post)}</time>
            </Meta>
          }
        >
          <article className="space-y-4">
            <ArticleMarkdown>{post.body}</ArticleMarkdown>
          </article>
        </Section>

        <NewsletterSection className="fade-up fade-up-2" />
        <SiteFooter className="fade-up fade-up-3" />

        <Landing />
      </div>
    </main>
  )
}
