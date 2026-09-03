import Link from "next/link"

/** The one dress for a link in prose: strong ink on a hairline that deepens on hover. */
export const textLinkClassName =
  "border-b border-border text-primary transition-colors hover:border-primary"

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={textLinkClassName}>
      {children}
    </Link>
  )
}
