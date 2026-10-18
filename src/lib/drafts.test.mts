import assert from "node:assert/strict"
import { test } from "node:test"

import { showDrafts, visiblePosts } from "./drafts.ts"

const posts = [
  { slug: "old", date: "2026-01-01T00:00:00.000Z", draft: false },
  { slug: "draft", date: "2026-10-18T00:00:00.000Z", draft: true },
  { slug: "new", date: "2026-06-01T00:00:00.000Z", draft: false },
]

test("production hides drafts", () => {
  assert.equal(showDrafts("production"), false)
  assert.deepEqual(
    visiblePosts(posts, showDrafts("production")).map((p) => p.slug),
    ["new", "old"],
  )
})

test("preview, development, and no Vercel env show drafts", () => {
  for (const env of ["preview", "development", undefined]) {
    assert.equal(showDrafts(env), true, String(env))
  }
  assert.deepEqual(
    visiblePosts(posts, showDrafts("preview")).map((p) => p.slug),
    ["draft", "new", "old"],
  )
})
