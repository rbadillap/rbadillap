import { readFileSync } from "node:fs"
import { join } from "node:path"

// The brand contract, served the way vercel.com/design.md serves theirs:
// one URL an agent can fetch before producing anything under this brand.
export const dynamic = "force-static"

export function GET() {
  const contract = readFileSync(
    join(process.cwd(), "brand", "DESIGN.md"),
    "utf-8",
  )
  return new Response(contract, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
