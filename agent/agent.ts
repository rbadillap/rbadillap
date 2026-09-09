import { defineAgent } from "eve"

/*
 * The site's agent. A string model ID routes through Vercel AI Gateway:
 * project OIDC on Vercel, AI_GATEWAY_API_KEY locally. Nova Lite was chosen
 * on 2026-09-09 after a smoke test of eight catalog models: correct on the
 * three probe questions, fastest (~0.8 s), about 30x cheaper than Sonnet 5,
 * and zero data retention across all providers. It has no reasoning
 * options, so none are set. Every answer is a lookup in instructions.md.
 *
 * defaultTools: false removes eve's default tool set (bash, read_file,
 * write_file, web_fetch, web_search, todo, ask_question, agent, task_*).
 * This agent is public and anonymous; it answers from its instructions
 * and must not reach a shell, the filesystem, or the network.
 */
export default defineAgent({
  model: "amazon/nova-lite",
  defaultTools: false,
  // Per-session caps, counted from AI Gateway's reported usage. A runaway or
  // abusive session stops itself; a fresh session is still free to start, so
  // the real throttle is a rate limit at the edge (Vercel Firewall).
  limits: {
    maxInputTokensPerSession: 60_000,
    maxOutputTokensPerSession: 6_000,
    maxTokenCostUsdPerSession: 0.05,
    sessionTimeoutMs: 24 * 60 * 60 * 1_000,
  },
})
