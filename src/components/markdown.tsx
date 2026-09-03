import Markdown, { type Components } from "react-markdown"

import { ExternalLink } from "@/components/external-link"
import { SynerMark } from "@/components/syner-mark"

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
