import { NextResponse } from "next/server"
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ContactFormEmail from '../../../emails/contact/contact-form';
import AutoResponseEmail from '../../../emails/contact/auto-response';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact data, in a real app this would come from a database
const contactData = {
  name: "Ronny Badilla",
  email: process.env.CONTACT_EMAIL || "",
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

    // Render the React email templates
    const notificationEmailHtml = await render(
      ContactFormEmail({
        name,
        email,
        message
      })
    );

    // Create plain text version for email clients that don't support HTML
    const plainText = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    // Send notification email to site owner
    const { error: notificationError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || '',
      subject: `New Contact Form Submission from rbadillap.dev`,
      replyTo: email,
      text: plainText,
      html: notificationEmailHtml,
    });

    if (notificationError) {
      console.error('Resend API error (notification):', notificationError);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    // Send auto-response email to the sender
    try {
      // Render the auto-response email template
      const autoResponseEmailHtml = await render(
        AutoResponseEmail({
          name
        })
      );

      // Send auto-response
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: 'Thank you for contacting Ronny Badilla',
        html: autoResponseEmailHtml,
      });
    } catch (autoResponseError) {
      // Log the error but don't fail the whole request
      console.error('Auto-response email error:', autoResponseError);
      // We still consider the submission successful even if the auto-response fails
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