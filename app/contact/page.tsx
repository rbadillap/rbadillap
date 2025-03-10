import { RootLayout } from "@/components/layout/RootLayout"
import { Mail, FileText } from "lucide-react"
import { SocialIcon } from "@/components/ui/social-icon"
import ContactForm from '../components/ContactForm'

export const metadata = {
  title: 'Contact | Ronny Badilla',
  description: 'Get in touch with Ronny Badilla for software development, DevOps consulting, and cloud architecture services.',
  openGraph: {
    title: 'Contact | Ronny Badilla',
    description: 'Get in touch with Ronny Badilla for software development, DevOps consulting, and cloud architecture services.',
  }
};

export default function ContactPage() {
  return (
    <RootLayout>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Get in touch for collaborations, questions, or just to say hello.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          <section>
            <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
            <ContactForm />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-8">Connect Directly</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a 
                    href={`mailto:${process.env.CONTACT_EMAIL || ""}`} 
                    className="text-primary hover:underline"
                    aria-label="Send email to Ronny Badilla"
                  >
                    {process.env.CONTACT_EMAIL || "Contact me"}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="github" size={20} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <a 
                    href="https://github.com/rbadillap" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                    aria-label="Visit Ronny Badilla's GitHub profile"
                  >
                    github.com/rbadillap
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="linkedin" size={20} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/rbadillap" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                    aria-label="Visit Ronny Badilla's LinkedIn profile"
                  >
                    linkedin.com/in/rbadillap
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <SocialIcon type="twitter" size={20} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">X / Twitter</h3>
                  <a 
                    href="https://x.com/rbadillap" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                    aria-label="Visit Ronny Badilla's X/Twitter profile"
                  >
                    x.com/rbadillap
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <h3 className="font-medium">Resume</h3>
                  <a 
                    href="/assets/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                    aria-label="Download Ronny Badilla's resume as PDF"
                    download
                  >
                    Download Resume
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