import * as React from "react"
import Link from "next/link"
import { CommandIcon } from "lucide-react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  const handleCommandClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-background/80 backdrop-blur-sm py-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div>
          <Link 
            href="/" 
            className="font-medium hover:opacity-80 transition-opacity text-lg"
          >
            Ronny Badilla
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleCommandClick}
            variant="ghost" 
            size="sm" 
            className="flex gap-2 items-center"
          >
            <CommandIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Command</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              ⌘K
            </kbd>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 