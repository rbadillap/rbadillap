"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from 'next/link'

export function HomeContent() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      toast.success("Welcome aboard! 🚀", {
        description: "I'm excited to share my journey with you. Keep an eye on your inbox!",
      })
      setEmail('')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-240px)]">
      <div className="flex flex-col items-center text-center space-y-6 max-w-[650px] animate-fade-in">
        <Avatar className="h-32 w-32 rounded-full shadow-lg">
          <AvatarImage src="/avatars/rbadillap.png" alt="Ronny Badilla" />
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
          Hey there! 👋 Join my journey into AI, Cloud, and Open Source. Also, I'm working on a new project called <Link href="https://synerops.com/?utm_source=rbadillap&utm_medium=website&utm_campaign=syner" className="text-primary">Syner</Link>.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Notify me'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam, unsubscribe at any time.
          </p>
        </form>
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
    </div>
  )
} 