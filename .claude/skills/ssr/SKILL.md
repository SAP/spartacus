---
name: ssr
description: "Use this skill when working with Spartacus Server-Side Rendering (SSR). Trigger when the user mentions SSR engine development, SSR E2E tests, server-side rendering issues, hydration problems, or needs to run SSR-related commands like 'npm run test:ssr' or 'npm run build:ssr'. Also trigger when working with files in 'core-libs/setup/ssr' or 'projects/ssr-tests/'."
---

# Spartacus SSR Development

This skill covers Server-Side Rendering (SSR) development and testing.

## Directory Structure

| Path | Purpose |
|------|---------|
| `core-libs/setup/ssr` | Custom Angular SSR engine |
| `projects/ssr-tests/` | E2E SSR tests (Node) |

## Commands

```bash
# Unit test SSR lib (Jest)
nx run setup:test

# E2E SSR (requires special build first)
npm run build:ssr:local-http-backend   # Build prerequisite - must run first
npm run test:ssr                       # Run SSR E2E tests
```
