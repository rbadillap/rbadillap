import { NextResponse } from "next/server"
import crypto from "crypto"

// In a real app, this would be stored in a database
const webhookSubscriptions: WebhookSubscription[] = []

interface WebhookSubscription {
  id: string
  url: string
  events: string[]
  secret: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.url || !body.events || !Array.isArray(body.events) || !body.secret) {
      return NextResponse.json(
        { error: "Missing required fields: url, events (array), and secret" },
        { status: 400 }
      )
    }
    
    // Validate URL format
    try {
      new URL(body.url)
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      )
    }
    
    // Validate event types
    const validEventTypes = ['project.published', 'article.published', 'workshop.scheduled']
    const hasInvalidEvent = body.events.some((event: string) => !validEventTypes.includes(event))
    
    if (hasInvalidEvent) {
      return NextResponse.json(
        { 
          error: "Invalid event type", 
          validEventTypes 
        },
        { status: 400 }
      )
    }
    
    // Create subscription
    const subscription: WebhookSubscription = {
      id: crypto.randomUUID(),
      url: body.url,
      events: body.events,
      secret: body.secret,
      createdAt: new Date().toISOString()
    }
    
    // Save subscription (in a real app, this would be in a database)
    webhookSubscriptions.push(subscription)
    
    // Return success
    return NextResponse.json({
      id: subscription.id,
      url: subscription.url,
      events: subscription.events,
      createdAt: subscription.createdAt,
      message: "Webhook registered successfully"
    }, { status: 201 })
    
  } catch (error) {
    console.error("Error processing webhook subscription:", error)
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}

export async function GET() {
  // In a real app, this would be protected by authentication
  return NextResponse.json({
    subscriptions: webhookSubscriptions.map(sub => ({
      id: sub.id,
      url: sub.url,
      events: sub.events,
      createdAt: sub.createdAt
    }))
  })
} 