import { RootLayout } from "@/components/layout/RootLayout"
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import Link from "next/link"
import Image from "next/image"
import { list } from '@vercel/blob'

export const metadata: Metadata = {
  robots: 'noindex, nofollow'
}

export default async function Syner() {
  const { blobs } = await list()
  const synerBlob = blobs.find(b => b.pathname === 'syner/content.md')
  
  if (!synerBlob) {
    throw new Error('Syner content not found')
  }

  const content = await fetch(synerBlob.url).then(r => r.text())

  return (
    <RootLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image 
                src="/logos/syner-dark.svg" 
                alt="Syner Logo" 
                width={96}
                height={96}
                className="dark:invert"
              />
            </div>
            <h1 className="text-4xl font-bold text-center mt-8">What Syner means to Me</h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({...props}) => <p className="text-base" {...props} />,
                h2: ({...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                blockquote: ({...props}) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
                ),
                a: ({href, ...props}) => {
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
                Syner is currently in private development. If you are interested in learning more or potentially becoming an early adopter, feel free to reach out.
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