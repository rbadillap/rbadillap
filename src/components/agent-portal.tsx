"use client"

import * as React from "react"

import { AgentChat } from "@/components/agent-chat"
import { textLinkClassName } from "@/components/external-link"

/*
 * The portal has two states and one header. In the site state it renders
 * the home sections; in the agent state the same column becomes a chat.
 * The mark, the name, and the tagline never leave (DESIGN.md: the full
 * symbol appears exactly once per surface). The switch is a text link in
 * the prose register, and Escape returns to the site.
 */
export function AgentPortal({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="fade-up">
        {header}
        <p className="mt-5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={textLinkClassName}
          >
            {open ? "← Back to the site" : "Chat with my agent →"}
          </button>
        </p>
      </header>
      {/* The chat stays mounted so a visitor can step back to the site and
          return to the same transcript; `hidden` toggles which view shows. */}
      <div hidden={!open}>
        <AgentChat />
      </div>
      <div hidden={open}>{children}</div>
    </>
  )
}
