import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TerminalIcon } from "lucide-react"

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
            <Avatar className="size-9">
              <AvatarImage src="/avatars/rbadillap.png" alt="Ronny Badilla" />
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        
        <div className="flex items-center">
          <Link href="/skills" className="hover:opacity-80 transition-opacity">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
            >
              <TerminalIcon className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 