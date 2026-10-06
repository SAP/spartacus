# skill-scan — content scanner for skill markdown

Automated content scanning for the customer-shipped skill markdown files under
[`core-libs/skills/skills/`](../../core-libs/skills/skills/).

Source-code scanners (Checkmarx, Black Duck, SonarQube) analyze code, not the
natural-language instructions inside `SKILL.md` / `references/*.md`. Those
instructions are executed by AI coding agents in customer projects, so malicious
prose is a real attack vector. This scanner closes that gap.

## What it checks

All findings are **blocking** (non-zero exit). The scan runs over the **entire**
shipped skill corpus on every run, not just changed files.

| Category | Rule |
|---|---|
| `forbidden-url` | Default-**deny**. Only `https` URLs whose host matches a domain in [`allowed-domains.txt`](./allowed-domains.txt) (by registrable-domain suffix) pass. Non-https schemes and bare `www.` links are blocked. Relative/anchor links are ignored. |
| `bidi-control` | Bidirectional formatting controls (U+202A–202E, U+2066–2069). |
| `invisible-char` | Invisible format / control characters (`\p{Cf}`, `\p{Cc}`) — zero-width space/joiner, BOM, soft hyphen, etc. Tab/newline/CR are allowed. |
| `homoglyph` | Letters outside the Latin script (e.g. a Cyrillic `а` masquerading as Latin `a`). Emoji, dashes, and arrows are punctuation/symbols and are **not** flagged. |
| `injection-language` | Conservative, high-signal prompt-injection / instruction-override phrases (see [`lib/config.mjs`](./lib/config.mjs)). Tuned for near-zero false positives on legitimate developer prose. |
| `link-mismatch` | Markdown links whose visible text is itself a full `http(s)` URL that disagrees with the link destination (e.g. `[https://docs.sap.com](https://evil.example)`) — a review-deception trick. Ordinary descriptive link text is ignored. |
| `hidden-comment` | HTML comments (`<!-- … -->`) in rendered markdown prose — invisible to a human reviewer but read verbatim by an AI agent. Comments inside fenced code blocks (shown literally as examples) are ignored. |

## Usage

```bash
# Scan the shipped skill corpus (default target)
node ci-scripts/skill-scan/scan.mjs

# Scan specific paths (files or directories)
node ci-scripts/skill-scan/scan.mjs core-libs/skills/skills/spartacus-developer

# Emit GitHub Actions annotations (auto-enabled when GITHUB_ACTIONS=true)
node ci-scripts/skill-scan/scan.mjs --github

# Run the unit tests
node --test ci-scripts/skill-scan/lib/checks.test.mjs
```

The scanner is **zero-dependency** Node ESM — no `npm install` required. It uses
Node 22 native Unicode property escapes.

## CI integration

[`.github/workflows/scan-skills.yml`](../../.github/workflows/scan-skills.yml)
runs on any PR that touches the skill corpus or the scanner itself. It runs the
unit tests, then the scan, and fails the check on any finding.

## Adding an allowed domain

Add the registrable domain (one per line) to
[`allowed-domains.txt`](./allowed-domains.txt). Keep the list minimal — each
entry widens the trusted surface.

## Design notes / policy

- **Default-deny URLs** rather than a denylist: an attacker-introduced host is
  caught because it is *not on the list*, which no denylist can anticipate.
- **No inline suppressions.** A `skill-scan: ignore` comment would itself be an
  injection vector. A genuine false positive is fixed by rewording the content
  or by a reviewed change to the allowlist / patterns.
- **Whole-corpus scan** (not diff-only): closes the blind spot of content that
  predates the gate or is reached by diff-scoping tricks.

## Reference implementations

The approach is informed by, but does not depend on, existing skill scanners:
[NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector) and the Cisco AI
Skill Scanner. A custom Node linter was chosen over vendoring those (Python /
Docker) tools to keep the control zero-dependency and native to this Node/Nx
monorepo, and to retain full control over the block/allow policy.
