import Markdown, { type Components } from "react-markdown"

import { ExternalLink } from "@/components/external-link"
import { Rule } from "@/components/rule"
import { SynerMark } from "@/components/syner-mark"

/** The dash-bullet item of the published `.list`: a 5px dash in muted, body-size text. */
export const dashItemClassName =
  "relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-[5px] before:bg-muted-foreground"

/**
 * Links in content use ExternalLink; links to syner.app carry the
 * SynerMark. The mark is decoration derived from the URL — never
 * stored in content.
 */
const link: Components["a"] = ({ href, children }) => (
  <ExternalLink href={href ?? "#"}>
    {href?.includes("syner.app") && (
      <SynerMark className="mr-[5px] inline-block size-[15px] align-[-2px]" />
    )}
    {children}
  </ExternalLink>
)

/** Renders content markdown as paragraphs with the site's presentation rules. */
export function ContentMarkdown({
  children,
  muted = false,
}: {
  children: string
  muted?: boolean
}) {
  const components: Components = {
    a: link,
    p: ({ children }) => (
      <p className={muted ? "text-muted-foreground" : undefined}>{children}</p>
    ),
  }

  return <Markdown components={components}>{children}</Markdown>
}

/** Renders one line of markdown without a paragraph wrapper — list items, labels. */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <Markdown components={{ a: link }} disallowedElements={["p"]} unwrapDisallowed>
      {children}
    </Markdown>
  )
}

/**
 * Renders a post body. Each element takes the dress the site already
 * publishes: h2 on the reserved --text-lg rung, h3 as the site's strong
 * subheads, lists as the dash list, quotes as the callout spine, code in
 * the mono register, a thematic break as a Rule. Bold is ink, not weight
 * beyond medium.
 */
export function ArticleMarkdown({ children }: { children: string }) {
  const components: Components = {
    a: link,
    h2: ({ children }) => (
      <h2 className="pt-6 text-(length:--text-lg) font-medium text-primary">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="pt-2 font-medium text-primary">{children}</h3>,
    strong: ({ children }) => <strong className="font-medium text-primary">{children}</strong>,
    ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
    ol: ({ children }) => (
      // numbered items keep the list's rhythm and trade the dash for a muted figure
      <ol className="list-decimal space-y-2 pl-4 marker:text-muted-foreground [&>li]:pl-0 [&>li]:before:hidden">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className={dashItemClassName}>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="space-y-4 border-l-2 border-primary pl-4">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono text-(length:--text-sm) text-primary">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto font-mono text-(length:--text-xs) [&>code]:text-[length:inherit] [&>code]:text-foreground">
        {children}
      </pre>
    ),
    hr: () => <Rule className="my-4 block" />,
  }

  return <Markdown components={components}>{children}</Markdown>
}
