import Link from "next/link"
import { home } from "#content"

import { SectionLabel } from "@/components/section"
import { cn } from "@/lib/utils"

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("mt-[88px]", className)}>
      <SectionLabel label="Elsewhere" />
      <nav className="flex gap-6 text-(length:--text-sm)">
        {home.elsewhere.map((link) => (
          <FooterLink key={link.href} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </nav>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="-mx-1 -my-2 px-1 py-2 text-foreground transition-colors hover:text-primary"
    >
      {children}
    </Link>
  )
}
