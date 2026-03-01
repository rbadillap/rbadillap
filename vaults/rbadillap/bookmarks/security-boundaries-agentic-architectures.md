---
url: https://vercel.com/blog/security-boundaries-in-agentic-architectures
tags: [ai, agents, security, vercel, sandbox, code execution]
---

# Security Boundaries in Agentic Architectures

Malte Ubl & Harpreet Arora - Feb 2026

To fetch the full content in markdown:
```bash
curl -H "Accept: text/markdown" "https://vercel.com/blog/security-boundaries-in-agentic-architectures"
```

## Summary

The article addresses something most teams ignore: when an agent generates and executes code, that code has access to everything the agent has. A prompt injection in a log can make the agent exfiltrate your SSH keys.

They propose separating the harness (where secrets live) from the sandbox (where generated code runs). Neither should have access to the other's context.

Useful mental framework for thinking about agent architectures in production. The recommendation to combine separated compute with network-level secret injection is practical and applicable.
