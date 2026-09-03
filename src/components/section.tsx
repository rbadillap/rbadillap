import * as React from "react"

import { Meta } from "@/components/meta"
import { Node } from "@/components/node"
import { Rule } from "@/components/rule"
import { cn } from "@/lib/utils"

/**
 * Gestures of the symbol, composed from the primitives (DESIGN.md):
 * a section label is Node + Meta + Rule; the page's landing is
 * Rule + Node. `aside` is an optional annotation at the end of the
 * label row — a counter or one action in the mono register. It sits
 * outside the decorative parts so it stays reachable.
 */
function SectionLabel({
  label,
  aside,
  className,
}: {
  label: string
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-7 flex items-center gap-2.5", className)}>
      <Node />
      <Meta aria-hidden="true">{label}</Meta>
      <Rule className="flex-1" />
      {aside}
    </div>
  )
}

function Section({
  label,
  aside,
  className,
  children,
}: {
  label: string
  aside?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("mt-[88px]", className)} aria-label={label}>
      <SectionLabel label={label} aside={aside} />
      <div>{children}</div>
    </section>
  )
}

/** The landing: the page closes where the symbol lands. */
function Landing({ className }: { className?: string }) {
  return (
    <div className={cn("mt-[72px] flex items-center", className)} aria-hidden="true">
      <Rule className="flex-1" />
      <Node className="bg-muted-foreground" />
    </div>
  )
}

export { Section, SectionLabel, Landing }
