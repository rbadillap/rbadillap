import { home } from "#content"

import { ogContentType, ogSize, renderOgImage } from "@/lib/og"
import { getPost } from "@/lib/posts"

export const alt = "Writing"
export const size = ogSize
export const contentType = ogContentType

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  // one image per published post (params come from the page); a draft in
  // production has none
  const post = getPost((await params).slug)
  if (!post) return new Response("Not found", { status: 404 })
  return renderOgImage({ title: post.title, meta: home.name })
}
