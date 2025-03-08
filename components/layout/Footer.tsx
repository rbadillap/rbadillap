import * as React from "react"
import { SocialIcon } from "@/components/ui/social-icon"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-4 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ronny Badilla
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SocialIcon type="github" size={20} />
          </a>
          <a
            href="https://linkedin.com/in/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SocialIcon type="linkedin" size={20} />
          </a>
          <a
            href="https://x.com/rbadillap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SocialIcon type="twitter" size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
} 