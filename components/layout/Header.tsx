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
            variant="outline" 
            size="sm" 
            className="flex gap-2 items-center px-3 py-2"
            aria-label="Open site navigation"
          >
            <CommandIcon className="h-4 w-4" />
            <span className="sm:inline">Menu</span>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 