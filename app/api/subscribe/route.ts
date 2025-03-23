import { NextResponse } from "next/server"

const LOOPS_ENDPOINT = "https://app.loops.so/api/newsletter-form/cm8kuiu3g0b2ffcpb6ebdwtvo"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check rate limiting using server-side timestamp
    const timestamp = Date.now()
    const cookieStore = request.headers.get('cookie')
    const lastSubmission = cookieStore?.match(/lastSubmission=(\d+)/)
    const lastTimestamp = lastSubmission ? parseInt(lastSubmission[1]) : 0

    if (lastTimestamp && (timestamp - lastTimestamp) < 60000) {
      return NextResponse.json(
        { error: "Too many signups, please try again in a little while" },
        { status: 429 }
      )
    }

    const response = await fetch(LOOPS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to subscribe")
    }

    // Set rate limiting cookie
    const headers = new Headers()
    headers.append('Set-Cookie', `lastSubmission=${timestamp}; Path=/; Max-Age=3600`)

    return NextResponse.json(
      { success: true },
      { 
        status: 200,
        headers
      }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Something went wrong, please try again" },
      { status: 500 }
    )
  }
} 