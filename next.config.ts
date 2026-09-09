import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
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
