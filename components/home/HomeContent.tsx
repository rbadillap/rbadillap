"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CommandIcon } from "lucide-react"

export function HomeContent() {
  // Function to trigger the command bar
  const triggerCommandBar = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-240px)]">
        <div className="flex flex-col items-center text-center space-y-6 max-w-[650px] animate-fade-in">
          <Avatar className="h-32 w-32 border-2 border-primary/10 rounded-full shadow-lg">
            <AvatarImage src="/avatars/rbadillap.jpg" alt="Ronny Badilla" />
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ronny Badilla
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Software Developer & DevOps Engineer
            </p>
          </div>
          
          <div className="h-[1px] w-48 bg-border my-6"></div>
          
          <p className="text-base text-muted-foreground max-w-md">
            Building modern, interoperable systems with a focus on minimal design and exceptional user experience.
          </p>
        </div>
        
        <div className="mt-12 animate-pulse-slow">
          <Button
            onClick={triggerCommandBar}
            variant="outline"
            size="lg"
            className="flex items-center gap-3 px-5 py-6 text-base rounded-lg shadow-sm hover:shadow transition-all"
          >
            <CommandIcon className="h-5 w-5 text-primary" /> 
            Press <kbd className="mx-1 px-2 py-1 bg-muted rounded font-mono">⌘K</kbd> to begin
          </Button>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </>
  )
} 