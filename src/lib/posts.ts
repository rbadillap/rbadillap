import { posts as allPosts } from "#content"

import { visiblePosts } from "@/lib/drafts"

export type Post = (typeof allPosts)[number]

const siteUrl = "https://ronnybadilla.com"

/** Every post this build publishes, newest first (drafts per src/lib/drafts.ts). */
export const posts = visiblePosts(allPosts)

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export const postPath = (post: Post) => `/writing/${post.slug}`
export const postUrl = (post: Post) => `${siteUrl}${postPath(post)}`

/** The date as published: the ISO day, in the mono data register. */
export const postDate = (post: Post) => post.date.slice(0, 10)

/** The post as an agent reads it: frontmatter, then the body verbatim. */
export function postMarkdown(post: Post) {
  const frontmatter = [
    `title: ${JSON.stringify(post.title)}`,
    `description: ${JSON.stringify(post.description)}`,
    `date: ${postDate(post)}`,
    `canonical: ${postUrl(post)}`,
  ]
  if (post.draft) frontmatter.push("draft: true")
  return `---\n${frontmatter.join("\n")}\n---\n\n${post.body.trim()}\n`
}
