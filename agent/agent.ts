import { defineAgent } from "eve"

/*
 * The site's agent. A string model ID routes through Vercel AI Gateway:
 * project OIDC on Vercel, AI_GATEWAY_API_KEY locally. Sonnet 5 keeps a
 * public, anonymous surface fast and cheap; reasoning stays low because
 * every answer is a lookup in instructions.md, not a derivation.
 */
export default defineAgent({
  model: "anthropic/claude-sonnet-5",
  reasoning: "low",
})
