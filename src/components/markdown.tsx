import Markdown, { type Components } from "react-markdown"

import { ExternalLink } from "@/components/external-link"
import { SynerMark } from "@/components/syner-mark"

/**
 * Renders content markdown with the site's presentation rules: links use
 * ExternalLink, and links to syner.app carry the SynerMark. The mark is
 * decoration derived from the URL — never stored in content.
 */
export function ContentMarkdown({
  children,
  muted = false,
}: {
  children: string
  muted?: boolean
}) {
  const components: Components = {
    a: ({ href, children }) => (
      <ExternalLink href={href ?? "#"}>
        {href?.includes("syner.app") && (
          <SynerMark className="mr-[5px] inline-block size-[15px] align-[-2px]" />
        )}
        {children}
      </ExternalLink>
    ),
    p: ({ children }) => (
      <p className={muted ? "text-foreground-muted" : undefined}>{children}</p>
    ),
  }

  return <Markdown components={components}>{children}</Markdown>
}
