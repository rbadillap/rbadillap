import * as React from "react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a
            href="https://github.com/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <TwitterIcon className="h-5 w-5" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ronny Badilla
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">⌘K</kbd> to navigate
        </div>
      </div>
    </footer>
  )
} 