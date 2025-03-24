import { RootLayout } from "@/components/layout/RootLayout"
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import Link from "next/link"

export const metadata: Metadata = {
  robots: 'noindex, nofollow'
}

async function getContent() {
  const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/syner/content`, {
    next: { revalidate: 60 } // Revalidate every minute
  })

  if (!res.ok) {
    throw new Error('Failed to fetch content')
  }

  const data = await res.json()
  return data.content
}

export default async function SynerPage() {
  const content = await getContent()

  console.log(content)

  return (
    <RootLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <img 
                src="/logos/syner-dark.svg" 
                alt="Syner Logo" 
                className="h-24 dark:invert"
              />
            </div>
            <h1 className="text-4xl font-bold text-center mt-8">What Syner means to Me</h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="text-base" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
                ),
                a: ({node, href, ...props}) => {
                  const isExternal = href?.startsWith('http')
                  if (isExternal) {
                    return <a href={href} className="text-primary hover:underline hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />
                  }
                  return <Link href={href || '#'} className="text-primary hover:underline hover:text-primary/80" {...props} />
                }
              }}
            >
              {content}
            </ReactMarkdown>

            <div className="not-prose bg-muted/50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold mb-2">Early Access</h3>
              <p className="text-muted-foreground mb-4">
                Syner is currently in private development. If you're interested in learning more or potentially becoming an early adopter, feel free to reach out.
              </p>
              <a 
                href="mailto:info@rbadillap.dev?subject=Syner Early Access"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 