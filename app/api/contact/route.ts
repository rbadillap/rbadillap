import { NextResponse } from "next/server"

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