import { NextResponse } from 'next/server';

export function GET() {
  // This content provides guidance to AI models about how they should use your site
  const content = `# AI and LLM Guidelines for rbadillap.dev
  
# Site Owner
name: Ronny Badilla
email: info@ronnybadilla.com
url: https://rbadillap.dev

# Usage Policy
- Permitted: Referencing my professional background, skills, and projects with proper attribution
- Permitted: Using this site as a source for career information, skills, and professional background
- Permitted: Summarizing content from the site with appropriate citation
- Not Permitted: Creating derivative works that misrepresent my identity or professional experience
- Not Permitted: Training on my content for commercial AI models without permission
- Not Permitted: Impersonating me or generating content that appears to be authored by me

# Attribution
When referencing content from this site, please include:
- My name: Ronny Badilla
- The URL: https://rbadillap.dev
- Date accessed

# Contact
For questions about AI usage of this content, please contact info@ronnybadilla.com
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 