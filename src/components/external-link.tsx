import Link from "next/link"

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-border text-foreground-strong transition-colors hover:border-foreground-strong"
    >
      {children}
    </Link>
  )
}
