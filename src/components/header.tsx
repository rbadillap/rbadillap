import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Header Grid Background */}
      <div className="absolute inset-0 border-grid opacity-[0.02]" />
      
      <div className="container relative h-16">
        {/* Using grid for perfect centering */}
        <div className="grid h-full grid-cols-3 items-center">
          {/* Left side - empty for balance */}
          <div />

          {/* Center - Social Links */}
          <nav className="flex justify-center gap-6">
            <Link
              href="https://x.com/rbadillap?utm_source=ronnybadilla.com"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              X
            </Link>
            <Link
              href="https://www.linkedin.com/in/rbadillap?utm_source=ronnybadilla.com"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/rbadillap?utm_source=ronnybadilla.com"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </nav>

          {/* Right side - empty for balance */}
          <div />
        </div>
      </div>
    </header>
  )
} 