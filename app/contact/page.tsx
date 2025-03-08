import { RootLayout } from "@/components/layout/RootLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"

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
                <Github className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
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
                <Linkedin className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/ronnybadilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    linkedin.com/in/ronnybadilla
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h3 className="font-medium mb-2">API Integration</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Contact information is available programmatically via our API:
                </p>
                <pre className="p-3 bg-muted text-xs rounded-md overflow-x-auto">
                  <code>GET /api/contact</code>
                </pre>
                <Link
                  href="/api"
                  className="text-primary hover:text-primary/80 transition-colors mt-2 text-sm inline-block"
                >
                  View API Documentation
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </RootLayout>
  )
} 