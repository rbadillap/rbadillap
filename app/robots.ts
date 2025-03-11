import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Note: For AI crawlers, we've also created a /llms.txt file
  // accessible at https://rbadillap.dev/llms.txt
  // This provides guidance specifically for AI models
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cv/', '/_next/'],
    },
    sitemap: 'https://rbadillap.dev/sitemap.xml',
    host: 'https://rbadillap.dev',
  };
} 