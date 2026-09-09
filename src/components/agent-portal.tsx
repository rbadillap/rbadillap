"use client"

import * as React from "react"

import { AgentChat } from "@/components/agent-chat"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

/*
 * The portal has two states and one header. In the site state it renders
 * the home sections; in the agent state the same column becomes a chat.
 * The mark, the name, and the tagline never leave (DESIGN.md: the full
 * symbol appears exactly once per surface). The switch sits to the right
 * of the mark and carries its key: C opens the chat, Escape closes it.
 * Like the D theme key, the shortcut is ignored while typing.
 */
export function AgentPortal({
  mark,
  header,
  children,
}: {
  mark: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)

      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (typing) return
      if (e.key === "c" || e.key === "C") {
        // Otherwise the same keystroke lands in the composer we just focused.
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <header className="fade-up">
        <div className="mb-7 flex items-center justify-between gap-6">
          {mark}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={cn(
              "-mx-1 -my-2 inline-flex items-center gap-2 px-1 py-2 text-(length:--text-sm)",
              "text-foreground transition-colors hover:text-primary",
            )}
          >
            {open ? "Back to the site" : "Chat with my agent"}
            <Kbd className="font-mono">{open ? "Esc" : "C"}</Kbd>
          </button>
        </div>
        {header}
      </header>
      {/* The chat stays mounted so a visitor can step back to the site and
          return to the same transcript; `hidden` toggles which view shows. */}
      <div hidden={!open}>
        <AgentChat active={open} />
      </div>
      <div hidden={open}>{children}</div>
    </>
  )
}
