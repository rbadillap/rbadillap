/*
 * Draft gating: drafts are shown unless VERCEL_ENV is "production". Vercel
 * production → hidden (not listed, not routable, no OG image, no .md);
 * Vercel preview, local dev, and any build without VERCEL_ENV → shown, so
 * the owner reviews a real URL. next.config.ts inlines VERCEL_ENV at build,
 * so the value read at build time is the one that ships, on every route.
 */
export function showDrafts(vercelEnv: string | undefined = process.env.VERCEL_ENV): boolean {
  return vercelEnv !== "production"
}

/** The posts a build may publish, newest first. */
export function visiblePosts<T extends { draft: boolean; date: string }>(
  posts: readonly T[],
  drafts: boolean = showDrafts(),
): T[] {
  return posts
    .filter((post) => drafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}
