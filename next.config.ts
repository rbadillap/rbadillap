import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  // Inlined at build so draft gating (src/lib/drafts.ts) is decided once per
  // deployment, also in the routes that render on demand (OG images).
  env: { VERCEL_ENV: process.env.VERCEL_ENV ?? "" },
  async rewrites() {
    return {
      // a post as raw markdown: /writing/[slug].md → its route handler
      beforeFiles: [{ source: "/writing/:slug([a-z0-9-]+)\\.md", destination: "/writing/:slug/md" }],
    };
  },
  async headers() {
    return [
      {
        // /resume is reachable only by exact link: keep it and its OG image
        // out of every index, cache, and archive.
        source: "/resume/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }],
      },
      {
        source: "/resume",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }],
      },
      {
        source: "/resume.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

// withEve mounts the agent under agent/ at same-origin /eve/v1/* routes:
// one dev server, one Vercel deploy, no CORS (eve docs: guides/frontend/nextjs).
export default withEve(nextConfig);
