import { getPost, postMarkdown, posts } from "@/lib/posts"

// The post as raw markdown, served at /writing/[slug].md (rewrite in
// next.config.ts) the way /design.md serves the contract: one clean URL an
// agent can fetch. Same gating as the page: unpublished slugs are a 404.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) return new Response("Not found", { status: 404 })
  return new Response(postMarkdown(post), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
