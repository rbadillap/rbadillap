import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-background/80 backdrop-blur-sm py-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div>
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity flex items-center"
            aria-label="Home"
          >
            <Avatar className="size-9 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <AvatarImage src="/avatars/rbadillap.jpg" alt="Ronny Badilla" />
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 