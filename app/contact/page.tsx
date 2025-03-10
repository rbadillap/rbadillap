"use client"

import { RootLayout } from "@/components/layout/RootLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { SocialIcon } from "@/components/ui/social-icon"

export default function ContactPage() {
  return (
    <RootLayout>
      <div className="flex flex-col space-y-12 max-w-3xl">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Contact Me</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch for collaborations, questions, or just to say hello.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                This is a demo form and doesn&apos;t submit data.
              </p>
            </form>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Connect Directly</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href="mailto:info@ronnybadilla.com"
                    className="text-primary hover:underline"
                  >
                    info@ronnybadilla.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="github" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <a
                    href="https://github.com/rbadillap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/rbadillap
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="linkedin" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/rbadillap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    linkedin.com/in/rbadillap
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="twitter" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">X / Twitter</h3>
                  <a
                    href="https://x.com/rbadillap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    x.com/rbadillap
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </RootLayout>
  )
} 