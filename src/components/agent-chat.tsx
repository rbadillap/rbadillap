"use client"

import * as React from "react"
import { useEveAgent } from "eve/react"

import { ContentMarkdown } from "@/components/markdown"
import { Meta } from "@/components/meta"
import { Node } from "@/components/node"
import { Rule } from "@/components/rule"
import { Section } from "@/components/section"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  "What is Ronny working on right now?",
  "What is his experience with AI governance?",
  "Which open-source projects has he published?",
]

/*
 * The transcript is the symbol's spine: a vertical Rule with one Node per
 * turn — each message a decision point on the baseline. The visitor's
 * nodes are muted, the agent's strong. The composer wears the newsletter
 * form's dress: one component, one dress (DESIGN.md).
 */
export function AgentChat({ active }: { active: boolean }) {
  const agent = useEveAgent()
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const busy = agent.status === "submitted" || agent.status === "streaming"
  const resuming = agent.status === "resuming"
  const messages = agent.data.messages

  // The chat stays mounted while hidden; focus the composer each time it shows.
  React.useEffect(() => {
    if (active) inputRef.current?.focus()
  }, [active])

  const submit = (text: string) => {
    const message = text.trim()
    if (message.length === 0 || resuming) return
    void agent.send(message, busy ? { turnPolicy: "steer" } : undefined)
    setDraft("")
  }

  const last = messages[messages.length - 1]
  const lastHasText =
    last?.role === "assistant" &&
    last.parts.some((p) => p.type === "text" && p.text.trim().length > 0)
  const status =
    agent.status === "error"
      ? (agent.error?.message ?? "Something went wrong. Try again.")
      : resuming
        ? "Resuming…"
        : busy && !lastHasText
          ? "Thinking…"
          : ""

  return (
    <Section label="Agent" className="fade-up fade-up-1">
      {messages.length === 0 ? (
        <div className="space-y-5">
          <p>
            Ask about Ronny&apos;s work, his experience, or what he is building. Answers come
            from this site, nothing else.
          </p>
          <ul className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => submit(s)}
                  className="text-left text-muted-foreground transition-colors hover:text-primary"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ol className="relative space-y-7 pl-6" aria-live="polite">
          <Rule orientation="vertical" className="absolute inset-y-1.5 left-0" />
          {messages.map((m) => {
            const user = m.role === "user"
            return (
              <li key={m.id} className="relative">
                <Node
                  className={cn(
                    "absolute -left-6 top-[6px] -translate-x-1/2",
                    user && "bg-muted-foreground",
                  )}
                />
                <Meta>{user ? "You" : "Agent"}</Meta>
                <div className="mt-1.5 space-y-3">
                  {m.parts.map((part, i) =>
                    part.type === "text" ? (
                      user ? (
                        <p key={i} className="text-primary">
                          {part.text}
                        </p>
                      ) : (
                        <ContentMarkdown key={i}>{part.text}</ContentMarkdown>
                      )
                    ) : null,
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <form
        className="mt-10"
        onSubmit={(e) => {
          e.preventDefault()
          submit(draft)
        }}
      >
        <div className="flex items-baseline gap-4 border-b border-primary">
          <input
            ref={inputRef}
            type="text"
            name="message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={resuming}
            autoComplete="off"
            placeholder="Ask anything about his work"
            aria-label="Message"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-(length:--text-body) text-primary placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={resuming || draft.trim().length === 0}
            className="min-w-[84px] shrink-0 py-2.5 text-right font-mono text-(length:--text-2xs) font-medium uppercase tracking-[0.16em] text-primary transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p
          className="mt-3 min-h-5 text-(length:--text-sm) text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </form>
    </Section>
  )
}
