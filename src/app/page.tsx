import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Header />
      
      <main className="relative flex-1">
        {/* Main background grid */}
        <div className="pointer-events-none fixed inset-0 border-grid opacity-[0.03]" />
        
        {/* Content */}
        <div className="mx-auto w-full max-w-[640px] px-6 py-24">
          <div className="space-y-24">
            {/* Profile */}
            <div className="flex flex-col items-center space-y-8">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/rbadillap.png" alt="Ronny Badilla" />
                <AvatarFallback>RB</AvatarFallback>
              </Avatar>
              <div className="space-y-6 text-center">
                <div>
                  <h1 className="text-2xl">Hey, I&apos;m Ronny 👋</h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Cloud builder. AI tinkerer. DevOps nerd.
                  </p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                I&apos;ve built cloud platforms, shipped AI products, and improved dev workflows along the way.<br />
                Now I&apos;m building <Link href="https://syner.app?utm_source=ronnybadilla.com" className="text-blue-500 hover:underline">Syner</Link> — an AI-native OS for the web.

              </p>
            </div>

            {/* Experience */}
            <div className="space-y-8">
              <h2 className="text-xl">Where I&apos;ve Worked</h2>
              <div className="space-y-4">
                <div className="group fade-border rounded-lg p-4 transition-colors hover:bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>SynerOps</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Founder</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2025</span>
                  </div>
                </div>

                <div className="group fade-border rounded-lg p-4 transition-colors hover:bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>Automattic</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Platform Engineer</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2023</span>
                  </div>
                </div>

                <div className="group fade-border rounded-lg p-4 transition-colors hover:bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>FedRAMP.gov</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Solutions Architect</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What I Do Best */}
            <div className="space-y-8">
              <h2 className="text-xl">What I Do Best</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="fade-border rounded-lg border p-4">
                  <h3 className="text-sm font-medium">Cloud & DevOps</h3>
                  <p className="mt-2 text-sm text-muted-foreground">AWS architecture, infrastructure automation, and CI/CD pipelines</p>
                </div>
                <div className="fade-border rounded-lg border p-4">
                  <h3 className="text-sm font-medium">AI Solutions</h3>
                  <p className="mt-2 text-sm text-muted-foreground">LLM integration, RAG systems, and AI-powered tools</p>
                </div>
              </div>
            </div>

            {/* Writing */}
            {/* <div className="space-y-6">
              <h2 className="text-xl">Latest Thoughts</h2>
              <Link 
                href="https://ronnybadilla.medium.com" 
                className="group fade-border flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-card"
              >
                <div className="space-y-1">
                  <h3>Modern DevOps Practices</h3>
                  <p className="text-sm text-muted-foreground">Thoughts on building better deployment pipelines</p>
                </div>
                <span className="text-sm text-muted-foreground">2024</span>
              </Link>
            </div> */}

            {/* Newsletter */}
            {/* <div className="relative overflow-hidden rounded-xl border bg-card/40 p-8 fade-border">
              <div className="border-grid absolute inset-0 opacity-[0.03]" />
              <div className="relative space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl">Let's Stay Connected</h2>
                  <p className="text-muted-foreground">
                    I share insights about cloud architecture and AI engineering. Join me?
                  </p>
                </div>
                <form className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="flex-1 rounded-lg border bg-background/50 px-4 py-3 text-sm backdrop-blur placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button className="inline-flex items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                    Subscribe
                  </button>
                </form>
              </div>
            </div> */}

            {/* Footer with avatar in the center */}
            <div className="flex items-center justify-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/rbadillap.png" alt="Ronny Badilla" title="Ronny Badilla" className="rounded-full" />
                <AvatarFallback>RB</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/synerops.jpg" alt="SynerOps" title="SynerOps" className="rounded-full" />
                <AvatarFallback>SO</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/syner-light.svg" alt="Syner" title="Syner" className="rounded-full" />
                <AvatarFallback>SY</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

