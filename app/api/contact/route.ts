import { NextResponse } from "next/server"
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact data, in a real app this would come from a database
const contactData = {
  name: "Ronny Badilla",
  email: "info@ronnybadilla.com",
  social: {
    github: "https://github.com/rbadillap",
    linkedin: "https://linkedin.com/in/rbadillap",
    twitter: "https://x.com/rbadillap"
  },
  availableFor: [
    "Software Development Projects",
    "DevOps Consulting",
    "Cloud Architecture",
    "Technical Workshops",
  ]
}

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const format = searchParams.get("format") || "json"
  
  switch (format) {
    case "json":
      return NextResponse.json(contactData)
    case "vcard":
      const vcard = generateVCard(contactData)
      return new NextResponse(vcard, {
        headers: {
          "Content-Type": "text/vcard",
          "Content-Disposition": "attachment; filename=ronny-badilla.vcf"
        },
      })
    default:
      return NextResponse.json(
        { error: "Unsupported format" },
        { status: 400 }
      )
  }
}

// Helper function to generate vCard format
function generateVCard(data: typeof contactData) {
  return `BEGIN:VCARD
VERSION:3.0
N:Badilla;Ronny;;;
FN:${data.name}
EMAIL:${data.email}
URL;type=GitHub:${data.social.github}
URL;type=LinkedIn:${data.social.linkedin}
URL;type=Twitter:${data.social.twitter}
NOTE:Available for: ${data.availableFor.join(", ")}
END:VCARD`
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'info@ronnybadilla.com',
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
} 