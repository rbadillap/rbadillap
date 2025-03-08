import { RootLayout } from "@/components/layout/RootLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiPage() {
  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Interoperability Layer</h1>
          <p className="text-lg text-muted-foreground">
            This site is built with interoperability at its core, offering multiple ways to integrate
            and interact with the content and services.
          </p>
        </div>

        <Tabs defaultValue="webhooks">
          <TabsList className="mb-6">
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="integrations">Integration Points</TabsTrigger>
            <TabsTrigger value="api">REST API</TabsTrigger>
            <TabsTrigger value="sdk">SDK</TabsTrigger>
          </TabsList>
          
          <TabsContent value="webhooks" className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Event-Based Integration</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to events from this site to integrate with your own systems and workflows.
                Webhooks allow real-time notification when new content is published, projects are updated,
                or other significant events occur.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-4">Available Event Types</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm border-b pb-2 border-border">
                    <div className="font-medium">Event Type</div>
                    <div className="font-medium">Description</div>
                    <div className="font-medium">Payload Sample</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><code>project.published</code></div>
                    <div>Triggered when a new project is published</div>
                    <div>
                      <button className="text-primary text-xs hover:underline">View Sample</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><code>article.published</code></div>
                    <div>Triggered when a new article is published</div>
                    <div>
                      <button className="text-primary text-xs hover:underline">View Sample</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><code>workshop.scheduled</code></div>
                    <div>Triggered when a new workshop is scheduled</div>
                    <div>
                      <button className="text-primary text-xs hover:underline">View Sample</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Webhook Registration</h3>
                <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`POST /api/webhooks/subscribe
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook-endpoint",
  "events": ["project.published", "article.published"],
  "secret": "your-secret-key-for-validation"
}`}</pre>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Integration Points</h2>
              <p className="text-muted-foreground mb-6">
                Connect this site with your favorite tools and platforms to enhance your workflow.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-medium mb-2">Calendar Integration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add my availability to your calendar application.
                  </p>
                  <div className="text-sm">
                    <div className="mb-2">Supported formats:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        iCal
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Google Calendar
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Outlook
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import my contact details into your address book.
                  </p>
                  <div className="text-sm">
                    <div className="mb-2">Supported formats:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        vCard
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        JSON
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-medium mb-2">Projects Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sync my projects with your portfolio tracker or project management tool.
                  </p>
                  <div className="text-sm">
                    <div className="mb-2">Supported formats:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        JSON
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        XML
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        CSV
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-medium mb-2">Embeddable Widgets</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Embed my profile, projects, or availability on your site.
                  </p>
                  <div className="text-sm">
                    <div className="mb-2">Available widgets:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Profile Card
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Project Gallery
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Availability
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">REST API</h2>
              <p className="text-muted-foreground mb-6">
                Access resources programmatically through our REST API endpoints.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Authentication</h3>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`// Request an API key
POST /api/auth/key

// Use the key in your requests
GET /api/projects
Authorization: Bearer your-api-key`}</pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Available Endpoints</h3>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md border border-border">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded mr-2">GET</span>
                        <code className="font-mono">/api/projects</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieve a list of projects with filtering options.
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-md border border-border">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded mr-2">GET</span>
                        <code className="font-mono">/api/contact</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieve contact information in multiple formats (JSON, vCard).
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-md border border-border">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded mr-2">POST</span>
                        <code className="font-mono">/api/messages</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Send a message that will be delivered to my inbox.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="sdk" className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">SDK & Client Libraries</h2>
              <p className="text-muted-foreground mb-6">
                Use our client libraries to integrate with this site more easily.
              </p>
              
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-medium mb-4">JavaScript SDK</h3>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`// Installation
npm install rbadilla-client

// Usage
import { RBadillaClient } from 'rbadilla-client';

const client = new RBadillaClient({
  apiKey: 'your-api-key'
});

// Get projects
const projects = await client.projects.list({ 
  featured: true 
});`}</pre>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-primary text-sm hover:underline">View Documentation</button>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-medium mb-4">Python SDK</h3>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`# Installation
pip install rbadilla-client

# Usage
from rbadilla_client import RBadillaClient

client = RBadillaClient(api_key='your-api-key')

# Get projects
projects = client.projects.list(featured=True)`}</pre>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-primary text-sm hover:underline">View Documentation</button>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </RootLayout>
  )
} 