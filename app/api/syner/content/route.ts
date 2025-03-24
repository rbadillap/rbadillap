import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

const SYNER_CONTENT_URL = 'syner/content.md'

export async function GET() {
  try {
    const { blobs } = await list()
    const blob = blobs.find(b => b.pathname === SYNER_CONTENT_URL)
    
    if (!blob) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const response = await fetch(blob.url)
    const content = await response.text()
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error fetching Syner content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 