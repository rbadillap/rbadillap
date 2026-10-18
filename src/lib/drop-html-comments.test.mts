import assert from "node:assert/strict"
import { test } from "node:test"

import { dropHtmlComments } from "./drop-html-comments.ts"

test("drops HTML comments, block and inline, and keeps other raw HTML", () => {
  const tree = {
    type: "root",
    children: [
      { type: "html", value: "<!-- assistant -->" },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "Before " },
          { type: "html", value: "<!-- inline note -->" },
          { type: "html", value: "<b>" },
        ],
      },
      { type: "html", value: "<!--\nmulti\nline\n-->" },
    ],
  }
  dropHtmlComments()(tree)
  assert.deepEqual(tree, {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "text", value: "Before " },
          { type: "html", value: "<b>" },
        ],
      },
    ],
  })
})
