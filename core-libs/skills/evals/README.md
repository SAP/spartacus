# @spartacus/skills — Eval Harness

Measures the impact of the `spartacus-developer` skill on AI-generated Spartacus
code. **Dev tooling — never published** (excluded via `../.npmignore`).

It answers two questions:

1. **Impact** — how much does the skill improve AI-generated Spartacus code
   vs. no skill? (for demonstrating value)
2. **Compare** — did an edit to the skill help or hurt vs. the previous
   version? (run before merging a skill change)

Both use the same machinery: generate code with Claude Code across a suite of
realistic tasks, then score it with an **LLM judge** (primary) plus
**deterministic regex checks** (secondary cross-check).

## The ruler is faithful to the skill (fairness)

The whole number is only meaningful if the check measures what the skill
actually teaches — nothing stricter, nothing looser. Two guarantees enforce
that:

1. **The judge's rubric IS the shipped skill.** `ratings/spartacus-adherence.mjs`
   builds its per-pattern rules from the *verbatim bodies* of the
   `references/*.md` files at runtime (`loadPatterns().body` +
   `loadGeneralGuidance()`), and is told to honor every "Case A / Case B" and
   explicitly-permitted approach the text describes. When the skill changes, the
   ruler changes with it — so the class of bug where "the check flags as a
   violation something the skill blesses" cannot silently reappear. An audit
   found several such contradictions (component-scoped styles the skill permits
   in Case B, `HttpClient` inside a custom OCC adapter, CMS-wired routes); this
   coupling is what fixed them.
2. **Regex checks only cover context-free rules.** Five checks that a regex
   *cannot* decide without seeing intent (HttpClient / OnPush / styleUrls /
   cxUrl / SSR) were retired to the judge, which can read the context. The five
   that survive are unambiguous string-level facts (see
   `ratings/spartacus-patterns.mjs`). Retiring the biased checks made the ruler
   *more faithful*, not looser — the judge still catches those violations, with
   the context a regex lacks.

**This is a deliberate design constraint: never make a check easier to pass to
lift the number. Fix the skill, or fix a genuine measurement bug — never the
bar.**

## Cadence

**Manual, developer-run.** Not wired into CI — a full run costs real tokens and
~1–2 h. Run it yourself before opening a PR that changes skill content, and
paste the summary into the PR description.

---

## Single source of truth: the patterns

The Spartacus patterns the judge scores against are **not** hardcoded here.
Each `../skills/spartacus-developer/references/*.md` file declares its pattern
in YAML frontmatter:

```yaml
---
pattern-id: 3
name: "Lazy-load features via provideConfig(featureModules), not loadChildren"
regex-checks: [spartacus-no-loadchildren]
---
```

`lib/patterns.mjs` reads these at runtime — both the frontmatter (id/name/
regex-check links) and the markdown **body** (the rule text the judge scores
against). Add a reference file with a `pattern-id` → it automatically joins the
judge's rubric. Rename a pattern → one edit. The `regex-checks` link is optional
and only present on patterns whose rule a regex can decide context-free; the
context-dependent patterns carry no link and are judged only by the LLM. The 4
cross-cutting reference files (anti-patterns, configuration-troubleshooting,
placement-mechanisms, proxy-facade-pattern) have no `pattern-id`, and along with
`SKILL.md` are loaded as general guidance for the judge (`loadGeneralGuidance()`),
not scored as numbered patterns.

`prompts/evals.json` is the test-case set, in the shape from the
[agentskills.io evaluating-skills guide](https://agentskills.io/skill-creation/evaluating-skills)
(`skill_name` + `evals[]` with `id`, `expected_output`, `assertions`). Two
Spartacus-specific extensions: `prompt_file` (the harness sends the `.md`
verbatim to the LLM, so the prompt text lives there, not inline) and `targets`
(pattern ids that power `--skill`/`--pattern` narrowing). The `assertions` are
human-readable "what good looks like" checks; the LLM judge in
`ratings/spartacus-adherence.mjs` is the primary grader.

---

## Prerequisites

- `SAP_RBSCTOKEN` exported (private SAP npm registry — same as release testing).
- The Hyperspace proxy running, with `ANTHROPIC_AUTH_TOKEN` +
  `ANTHROPIC_BASE_URL` in the env (the judge and the claude-code runner both
  route through it). `postinstall` applies the proxy patch automatically.
- `npm install` in this directory.

---

## Usage

### One-time: build the templates

```bash
npm run init-template
```

Delegates to the repo's maintained `scripts/install/run.sh install_npm` to
build a fresh Spartacus CSR app, then creates two byte-identical templates that
differ **only** in `.claude/skills/`:

- `template-bare/` — no skill
- `template-skills/` — with `spartacus-developer` injected

Re-run when the Spartacus version bumps. Override the version with
`SPARTACUS_VERSION=…`; it warns if it drifts from `../package.json`.

### Smoke test (gate — always run first)

```bash
npm run eval:smoke      # 1 prompt, bare, Haiku (~a few min)
```

Confirms code generation + build + the LLM judge all work before you spend a
full run. Check `.web-codegen-scorer/reports/**/assessment.json` shows the
`spartacus-pattern-adherence` rating populated.

### Use case 1 — impact (bare vs skills)

```bash
npm run eval:impact                          # default model (Haiku)
npm run eval:impact -- --model=claude-4.6-opus   # run again with Opus
npm run aggregate
npm run report                               # writes skills-impact-report.html
```

Run once per model you want in the report; `aggregate` picks up all runs.

### Use case 2 — compare (skill A/B)

```bash
npm run init-template -- --snapshot   # snapshot CURRENT skill → template-skills-baseline
#   ...edit ../skills/spartacus-developer/... ...
npm run init-template                  # rebuild template-skills with your edits
npm run eval:compare
npm run aggregate && npm run report
```

`baseline` = the pre-edit snapshot, `treatment` = your edited skill.

### Narrowing — iterate on one skill fast

When you're improving a single reference, don't run all 15 prompts:

```bash
npm run eval:compare -- --skill=styling     # only prompts targeting pattern 8
npm run eval:compare -- --pattern=8         # same, by id
npm run eval:impact  -- --prompt-filter=exp-08   # native substring filter
```

`--skill`/`--pattern` select the prompt subset from `prompts/evals.json`
`targets`. Accuracy depends on those `targets` being correct — keep them
current when you add prompts.

---

## Layout

```
evals/
├── package.json            # own deps (web-codegen-scorer, ai sdk); opt-in
├── config.mjs              # parameterized env (template + label via env vars)
├── system-instructions-empty.md   # zero-byte control system prompt
├── prompts/                # 15 task .md files (pure task text) + evals.json (agentskills.io shape)
├── ratings/
│   ├── spartacus-adherence.mjs     # PRIMARY: LLM judge (patterns from frontmatter)
│   └── spartacus-patterns.mjs      # SECONDARY: regex cross-check
├── lib/
│   ├── patterns.mjs        # single-source-of-truth reader (+ .test.mjs)
│   └── select-prompts.mjs  # --skill/--pattern resolver (+ .test.mjs)
├── scripts/
│   ├── init-template.mjs   # delegates to scripts/install/run.sh
│   ├── run-eval.mjs        # entry point: modes + models + narrowing
│   ├── aggregate.mjs       # → matrix-results.json + pattern-comparison.json
│   └── link-claude.mjs     # postinstall: fix claude binary resolution
└── report/build-report.mjs # → skills-impact-report.html (self-contained)
```

## How scoring works (and its limits)

- **Primary — LLM judge** (`spartacus-adherence.mjs`): an Opus judge, blind to
  condition (never sees `.claude/` or which arm produced the code), scores each
  app 0–100 against the skill's own rule text and returns a per-pattern verdict.
  This is the headline metric.
- **Secondary — regex** (`spartacus-patterns.mjs`): 5 deterministic context-free
  checks, a cheap cross-check. When judge and regex disagree, inspect.
- **Caveats:** LLM-judge scores vary run-to-run (~±3 pts). The judge is
  deliberately strict, so absolute scores read low; the **delta** between arms
  is the signal, not the absolute.

## Release protocol (the published number)

The number that ships is produced under a fixed, written protocol so it's
defensible and reproducible:

- **One run per cell.** The matrix is `{bare, skills} × {haiku, opus}` = 4 cells,
  one generation pass each. (Given ~±3 pt judge variance, treat a per-cell lift
  smaller than that as noise, not signal.)
- **No-regression gate (hard).** For **every** model, the skills-arm mean
  adherence must be **≥** the bare-arm mean. If any single cell regresses, the
  release is blocked until the skill gap is fixed — we do not ship anything that
  worsens a customer's generated code. `npm run aggregate` enforces this
  automatically: it prints PASS/FAIL per model and **exits non-zero** if any
  cell drops below its bare baseline.
- **Frozen ruler.** The eval (judge rubric + regex checks) is frozen before the
  publication run. Skill iteration happens *before* the freeze; after it, only
  the skill under test may change, never the ruler — otherwise the number isn't
  comparable across runs.

## Tests

```bash
npm test    # pattern loader + prompt selector unit/integration tests
```
