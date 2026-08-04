import type { NextConfig } from "next";

// Content watch mode: `pnpm dev` runs an initial `velite` pass (see package.json);
// this hook keeps recompiling content/ on change while the dev server runs.
// Builds don't rely on it — `pnpm build` runs velite to completion first.
const isDev = process.argv.includes("dev");
if (isDev && !process.env.VELITE_STARTED) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((velite) => velite.build({ watch: true, clean: false }));
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
