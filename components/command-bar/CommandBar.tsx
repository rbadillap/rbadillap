"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTheme } from "@/components/layout/ThemeProvider"
import {
  HomeIcon, 
  UserIcon, 
  FolderIcon, 
  CodeIcon, 
  MailIcon, 
  GithubIcon, 
  LinkedinIcon, 
  SunIcon, 
  MoonIcon, 
  LaptopIcon,
  SearchIcon,
  ExternalLinkIcon,
  DownloadIcon,
  TwitterIcon
} from "lucide-react"

type CommandItem = {
  id: string
  label: string
  icon: React.ReactNode
  onSelect: () => void
  keywords?: string[]
  section: string
}

export function CommandBar() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const commandsListRef = React.useRef<HTMLDivElement>(null)
  const { setTheme } = useTheme()

  // Key handling for opening/closing the command bar
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
    // Reset selected item when opening/closing
    setSelectedItemIndex(-1)
  }, [open])

  // Commands data
  const allCommands = React.useMemo(() => [
    // Navigation
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
      section: "Navigation",
      keywords: ["home", "main", "index"],
      onSelect: () => {
        window.location.href = "/"
        setOpen(false)
      }
    },
    {
      id: "about",
      label: "About Me",
      icon: <UserIcon />,
      section: "Navigation",
      keywords: ["about", "bio", "profile", "resume"],
      onSelect: () => {
        window.location.href = "/about"
        setOpen(false)
      }
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderIcon />,
      section: "Navigation",
      keywords: ["projects", "portfolio", "work"],
      onSelect: () => {
        window.location.href = "/projects"
        setOpen(false)
      }
    },
    {
      id: "api",
      label: "API & Interoperability",
      icon: <CodeIcon />,
      section: "Navigation",
      keywords: ["api", "interoperability", "integration", "developer"],
      onSelect: () => {
        window.location.href = "/api"
        setOpen(false)
      }
    },
    {
      id: "contact",
      label: "Contact Me",
      icon: <MailIcon />,
      section: "Navigation",
      keywords: ["contact", "email", "message", "get in touch"],
      onSelect: () => {
        window.location.href = "/contact"
        setOpen(false)
      }
    },
    
    // External Links
    {
      id: "github",
      label: "GitHub Profile",
      icon: <GithubIcon />,
      section: "External",
      keywords: ["github", "code", "repository", "open source"],
      onSelect: () => {
        window.open("https://github.com/rbadillap", "_blank")
        setOpen(false)
      }
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      icon: <LinkedinIcon />,
      section: "External",
      keywords: ["linkedin", "social", "professional", "network"],
      onSelect: () => {
        window.open("https://linkedin.com/in/rbadillap", "_blank")
        setOpen(false)
      }
    },
    {
      id: "twitter",
      label: "X / Twitter",
      icon: <TwitterIcon />,
      section: "External",
      keywords: ["twitter", "x", "social", "tweet"],
      onSelect: () => {
        window.open("https://x.com/rbadillap", "_blank")
        setOpen(false)
      }
    },

    // Actions
    {
      id: "email",
      label: "Send Email",
      icon: <MailIcon />,
      section: "Actions",
      keywords: ["email", "contact", "message"],
      onSelect: () => {
        window.location.href = "mailto:info@ronnybadilla.com"
        setOpen(false)
      }
    },
    {
      id: "download-cv",
      label: "Download CV",
      icon: <DownloadIcon />,
      section: "Actions",
      keywords: ["cv", "resume", "download", "pdf"],
      onSelect: () => {
        window.open("/api/cv?format=pdf", "_blank")
        setOpen(false)
      }
    },
    {
      id: "download-vcard",
      label: "Download Contact Card",
      icon: <DownloadIcon />,
      section: "Actions",
      keywords: ["vcard", "contact", "card", "download"],
      onSelect: () => {
        window.open("/api/contact?format=vcard", "_blank")
        setOpen(false)
      }
    },
    
    // Theme
    {
      id: "theme-light",
      label: "Light Mode",
      icon: <SunIcon />,
      section: "Theme",
      keywords: ["theme", "light", "mode", "bright"],
      onSelect: () => {
        setTheme("light")
        setOpen(false)
      }
    },
    {
      id: "theme-dark",
      label: "Dark Mode",
      icon: <MoonIcon />,
      section: "Theme",
      keywords: ["theme", "dark", "mode", "night"],
      onSelect: () => {
        setTheme("dark")
        setOpen(false)
      }
    },
    {
      id: "theme-system",
      label: "System Theme",
      icon: <LaptopIcon />,
      section: "Theme",
      keywords: ["theme", "system", "auto", "default"],
      onSelect: () => {
        setTheme("system")
        setOpen(false)
      }
    },
  ], [setOpen, setTheme])

  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!search.trim()) return allCommands

    return allCommands.filter(command => {
      const searchLower = search.toLowerCase()
      
      // Check if label matches
      if (command.label.toLowerCase().includes(searchLower)) return true
      
      // Check if keywords match
      if (command.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      )) return true
      
      // Check if section matches
      if (command.section.toLowerCase().includes(searchLower)) return true
      
      return false
    })
  }, [allCommands, search])

  // Flatten commands for keyboard navigation
  const flattenedCommands = React.useMemo(() => {
    return filteredCommands
  }, [filteredCommands])

  // Group commands by section for display
  const groupedCommands = React.useMemo(() => {
    const grouped: Record<string, CommandItem[]> = {}
    
    filteredCommands.forEach(command => {
      if (!grouped[command.section]) {
        grouped[command.section] = []
      }
      grouped[command.section].push(command)
    })
    
    return grouped
  }, [filteredCommands])

  // Keyboard navigation handler
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const itemCount = flattenedCommands.length
    
    if (itemCount === 0) return
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedItemIndex(prevIndex => {
          const nextIndex = prevIndex >= itemCount - 1 ? 0 : prevIndex + 1
          scrollSelectedIntoView(nextIndex)
          return nextIndex
        })
        break
        
      case 'ArrowUp':
        e.preventDefault()
        setSelectedItemIndex(prevIndex => {
          const nextIndex = prevIndex <= 0 ? itemCount - 1 : prevIndex - 1
          scrollSelectedIntoView(nextIndex)
          return nextIndex
        })
        break
        
      case 'Enter':
        e.preventDefault()
        if (selectedItemIndex >= 0 && selectedItemIndex < itemCount) {
          flattenedCommands[selectedItemIndex].onSelect()
        }
        break
        
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
    }
  }, [flattenedCommands, selectedItemIndex, setOpen])

  // Scroll selected item into view
  const scrollSelectedIntoView = (index: number) => {
    setTimeout(() => {
      const selectedElement = document.getElementById(`command-item-${index}`)
      if (selectedElement && commandsListRef.current) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }, 0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px] p-0">
        <div className="flex items-center border-b border-border p-4">
          <SearchIcon className="h-4 w-4 mr-2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Command search"
            role="combobox"
            aria-expanded={open}
            aria-controls="command-list"
          />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
        <div 
          ref={commandsListRef}
          className="max-h-[60vh] overflow-y-auto py-2"
          role="listbox"
          id="command-list"
          tabIndex={-1}
        >
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No commands found. Try a different search.
            </div>
          ) : (
            Object.entries(groupedCommands).map(([section, commands]) => (
              <div key={section} className="mb-4" role="group" aria-labelledby={`section-${section}`}>
                <div 
                  id={`section-${section}`}
                  className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  {section}
                </div>
                <div>
                  {commands.map((command, idx) => {
                    // Find the global index of this command in the flattened list
                    const globalIndex = flattenedCommands.findIndex(c => c.id === command.id)
                    const isSelected = globalIndex === selectedItemIndex
                    
                    return (
                      <button
                        id={`command-item-${globalIndex}`}
                        key={command.id}
                        className={`w-full flex items-center px-4 py-2.5 text-sm hover:bg-muted text-left ${
                          isSelected ? 'bg-muted outline-2 outline outline-primary/20' : ''
                        }`}
                        onClick={command.onSelect}
                        onMouseEnter={() => setSelectedItemIndex(globalIndex)}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={-1}
                        data-command-index={globalIndex}
                      >
                        <span className="h-5 w-5 mr-3 text-primary">
                          {command.icon}
                        </span>
                        <span>{command.label}</span>
                        {command.section === 'External' && (
                          <ExternalLinkIcon className="h-3 w-3 ml-2 text-muted-foreground" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 