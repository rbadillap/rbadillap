"use client"

import * as React from "react"

/**
 * A post's code block: the code wraps instead of hiding past the edge,
 * and a mono "Copy" action, in the newsletter button's dress, copies it.
 */
export function CodeBlock({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLPreElement>(null)
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    const text = ref.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the code stays selectable by hand.
    }
  }

  return (
    <div data-slot="code-block" className="flex items-start gap-4">
      <pre
        ref={ref}
        className="min-w-0 flex-1 whitespace-pre-wrap font-mono text-(length:--text-xs) [overflow-wrap:anywhere] [&>code]:text-[length:inherit] [&>code]:text-foreground"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="shrink-0 font-mono text-(length:--text-2xs) font-medium uppercase tracking-[0.16em] text-primary transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  )
}
