---
title: Building a GitHub Action that checks itself
description: How a coordinator, a few implementers and a lot of throwaway pull requests built agent-plugins-validate, a GitHub Action that checks itself.
date: 2026-10-18
slug: building-a-github-action-that-checks-itself
draft: true
---

<!-- Draft. Paragraphs marked "assistant" were written by Claude; everything else is Ronny's words. The markers come out before publishing. -->

## The problem

Running [agent-plugins.directory](https://agent-plugins.directory), I talk with a lot of people who publish agent plugins, and I kept finding the same pattern: they all needed a middle layer to know when a plugin was failing.

<!-- assistant -->
Agent Plugins follow a [specification](https://github.com/agentplugins/agent-plugins-spec/blob/v1.0.0/spec/1.0.0.md): a `plugin.json` and, optionally, an `mcp.json`.

I wanted something I would use myself, something with no friction, that any coding agent could understand without needing a master's degree. So I built a GitHub Action that works on its own, between GitHub and your coding agent: [agent-plugins-validate](https://github.com/rbadillap/agent-plugins-validate).

## The team

I'm building [Syner](https://syner.app), an assistant that runs the day-to-day of my projects. It holds context on many things at once, and it knows its role is to coordinate, not to execute.

<!-- assistant -->
For this Action, that meant one coordinator session, separate sessions that wrote the code, and fresh reviewers that had never seen it.

Every design decision is planned. There's no planning mode, just conversation. When the coordinator wants to keep a note, it persists it. Projects start with a `README.md` and an `AGENTS.md`, before any code.

<!-- assistant -->
This one's [first pull request](https://github.com/rbadillap/agent-plugins-validate/pull/1) is exactly that: a README, an AGENTS.md, an architecture doc and an empty folder skeleton.

It never got out of hand. My guess is that the coordinator works within a scope, and the agents it starts work under its criteria.

## Issues first, then stacked pull requests

<!-- assistant -->
Nothing starts as code. Every change starts as an issue, and only the ones I approve get built. Arguing over a paragraph is cheap. Arguing over a finished diff isn't.

<!-- assistant -->
The pull requests came in small stacks. Each one is easy to read on its own, and the stack merges together, so nothing lands half done.

<!-- assistant -->
CI only runs what a change touches. A README edit doesn't wait for the whole test suite, and [we checked](https://github.com/rbadillap/agent-plugins-validate/pull/29).

## Throwaway pull requests

I've worked on pipelines for years, and I know how tedious they are to test. The agents found some really wild ways to do it.

<!-- assistant -->
For example: a pull request that [plants a template injection in a workflow](https://github.com/rbadillap/agent-plugins-validate/pull/34), to prove the security audit catches it. Another that [makes a rule stop reporting](https://github.com/rbadillap/agent-plugins-validate/pull/59), to prove the Action's self-check fails. Each one is opened, watched until it goes red, and closed without merging.

Agents can test things without everything being strictly local and in code. A pull request with a failing check is a way to show that a test works. Take that idea further and you get controlled autonomy.

<!-- assistant -->
The agent acts on the real system, on GitHub and in real CI, not in a simulation. But it acts where nothing can land: the pull request is never merged, the branch is deleted, and what's left is a public red run that proves the point. The agent is free to try things; the merge stays with a human.

## Hiding secrets doesn't work

Why do I ask my coordinator to open new chats instead of just spawning agents? Because it's always good to watch what the others are doing. I don't mean only the code. I mean how much effort a task takes them.

I saw this with secrets.

<!-- assistant -->
The Action repeated values from your manifest in its findings, and it masked credentials with patterns.

The coordinator started a third-level agent whose only job was to break the redaction, and it always found a way.

<!-- assistant -->
Three rounds of fixes; every round closed some leaks and opened others.

AI will always find a way to break a rule if that's what you ask it to do.

<!-- assistant -->
So we stopped hiding and stopped repeating. Findings now describe a value, like `string (34 chars)`, instead of echoing it.

Generating code has no value today. Use that. If something doesn't fit and the whole design has to change, change it.

<!-- assistant -->
The masking code was thrown away, not patched a fourth time.

A coordinator knows how much care a change that size needs, and it works hard to hand every detail to the agents that execute it, so they do it right.

## Blind tests

I wanted to see if it made sense without any context, the way a real user would read it.

<!-- assistant -->
We took a real plugin, broke it in four common ways, and gave two fresh agents (a small model and a mid-size one) nothing but the files and the CI output. Their job was to fix it and to tell us where they had to guess. Wherever they guessed, we rewrote the message, and then ran the test again with new agents.

## A reviewer who has never seen the code

<!-- assistant -->
The agent that writes the code is the worst one to review it: it already knows what it meant. So every big change got a reviewer started from scratch, with the issues, the diff and one instruction: try to break it. Before the last stack merged, that reviewer ran the real code and found three problems the tests hadn't. They were fixed before anything shipped.

## Use it first, then ship it

<!-- assistant -->
The Action didn't go to anyone until it ran on one of my own plugins. Every promise in the README got a real run there: an annotation on the exact line, an issue that opens when something breaks on the main branch and closes itself when it's fixed. Only then did it go public.

<!-- assistant -->
Releases are [immutable and attested](https://github.com/rbadillap/agent-plugins-validate/releases/tag/v1.0.0). A published version can't be moved, and anyone can check that the code they run was built from this repository:

```bash
gh attestation verify dist/index.js --repo rbadillap/agent-plugins-validate
```

---

Written by [Ronny](https://github.com/rbadillap), from a conversation with Claude.
