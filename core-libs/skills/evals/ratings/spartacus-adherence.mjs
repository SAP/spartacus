// @ts-check
/**
 * Spartacus Pattern Adherence — the PRIMARY metric for the skills eval.
 *
 * A custom `RatingKind.LLM_BASED` rating. It asks an LLM judge to score the
 * generated code against the 16 Spartacus patterns and return a per-pattern
 * verdict. This measures what the regex checks in `spartacus-patterns.mjs`
 * cannot: semantic adherence (was the Facade→Connector→Adapter pipeline
 * used correctly? is the CMS wiring complete? was a class extended vs.
 * reimplemented?). The regex checks stay on as a cheap deterministic
 * cross-check.
 *
 * === Fairness guarantees ===
 *
 *  1. BLIND TO CONDITION. The judge is shown only the generated files
 *     (`ctx.outputFiles`) and the task text (`ctx.fullPromptText`). It is
 *     never told whether the code came from the bare arm or the skills arm,
 *     and it never sees the `.claude/` directory (excluded by the runner's
 *     `ignoredFilePatterns`). The prompt below deliberately avoids the words
 *     "skill"/"bare" so the judge can't infer the arm.
 *
 *  2. CONSTANT JUDGE MODEL. The judge model is pinned here (not taken from
 *     the generator `--model`), so all four runs (bare/skills × haiku/opus)
 *     are judged by the same model. Override via `ADHERENCE_JUDGE_MODEL`.
 *
 *  3. RUBRIC = THE ACTUAL SKILL. The per-pattern rules the judge scores
 *     against are the VERBATIM bodies of the shipped skill reference files
 *     (`references/*.md`), loaded at runtime via `loadPatterns()`/
 *     `loadGeneralGuidance()` — not a hand-transcribed paraphrase. This
 *     couples the ruler to the skill by construction: when the skill changes,
 *     the rubric changes with it, so the class of "the check contradicts the
 *     skill" bugs (an audit found several — component-scoped styles that the
 *     skill blesses in Case B, HttpClient inside a custom OCC adapter,
 *     CMS-wired routes) cannot silently reappear. The rules carry their own
 *     explicitly-permitted cases and the judge is told to honor them rather
 *     than invent stricter rules. Override the references dir via
 *     `ADHERENCE_REFERENCES_DIR`.
 *
 * === Why we bypass `ctx.llm.generateConstrained` ===
 *
 * web-codegen-scorer's `generateConstrained` forces ai-sdk `Output.object`
 * structured output. Through the Hyperspace proxy that path returns "No
 * output generated" (thinking models) or "could not parse the response"
 * (non-thinking) — the structured-output mechanism isn't supported. Plain
 * `generateText` through the same proxy works perfectly. So we call the
 * anthropic provider directly (same auth the patch wires up), ask for JSON
 * in the prompt, and validate it with our Zod schema ourselves.
 *
 * === Scoring ===
 *
 * The judge returns `overallScore` (0–100). We convert it to the harness
 * coefficient (0–1) linearly. The per-pattern array is flattened into the
 * `details.categories` list (the only structured field the harness renders)
 * as `"<verdict> — <pattern name>"` → evidence/rationale, so the report can
 * reconstruct a per-pattern comparison across arms.
 */

import { z } from 'zod';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { RatingKind, RatingCategory, RatingState } from 'web-codegen-scorer';
import { loadPatterns, loadGeneralGuidance } from '../lib/patterns.mjs';

/**
 * Where per-experiment judge verdicts are written as machine-readable JSON.
 * The harness flattens rating `details` into a free-text `message` in
 * assessment.json, so the structured per-pattern array does not survive
 * there. We persist the raw validated verdict here so the report can read it
 * without re-parsing prose. Override via `ADHERENCE_VERDICT_DIR`.
 */
const VERDICT_DIR =
  process.env.ADHERENCE_VERDICT_DIR ??
  resolve(dirname(fileURLToPath(import.meta.url)), '..', '.adherence-verdicts');

/**
 * The judge model — a RAW anthropic API name (not the web-codegen-scorer
 * adapter alias), because we call the provider directly. `claude-opus-4-5`
 * resolves through the proxy; `claude-opus-4-8` also works if you prefer the
 * newer judge. Pinned + constant across all four runs. Override via
 * `ADHERENCE_JUDGE_MODEL`.
 */
const JUDGE_MODEL = process.env.ADHERENCE_JUDGE_MODEL ?? 'claude-opus-4-5';

/** Lazily-built anthropic provider pointed at the Hyperspace proxy. */
let _provider = null;
function getProvider() {
  if (_provider) return _provider;
  const authToken = process.env.ANTHROPIC_AUTH_TOKEN;
  if (authToken) {
    // Proxy (Hyperspace) auth. The proxy authenticates on the `Authorization:
    // Bearer` header. We pass it via `headers` rather than the SDK's
    // `authToken` option because the shipped `@ai-sdk/anthropic@2` does not
    // support `authToken` — it unconditionally requires an `apiKey` and only
    // ever sends `x-api-key`. So we set a placeholder `apiKey` purely to
    // satisfy the SDK's load-time check (the proxy ignores `x-api-key` when a
    // Bearer token is present) and carry the real credential in `Authorization`.
    // This path works identically on v2 and v3, so no dependency bump is
    // needed to run the release harness.
    const baseURL =
      process.env.ANTHROPIC_AISDK_BASE_URL || 'http://localhost:6655/anthropic/v1';
    _provider = createAnthropic({
      apiKey: 'proxy-auth-via-authorization-header',
      baseURL,
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } else {
    // Direct Anthropic API (e.g. CI with a real key).
    _provider = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _provider;
}

/**
 * The Spartacus patterns — loaded from the reference-file frontmatter (the
 * single source of truth). Add/rename a pattern by editing a `references/*.md`
 * file's frontmatter; the judge picks it up automatically. Loaded once at
 * module init. Override the references dir via `ADHERENCE_REFERENCES_DIR`
 * (e.g. to judge against a skill snapshot in compare mode).
 */
const ALL_PATTERNS = loadPatterns(process.env.ADHERENCE_REFERENCES_DIR || undefined);

/**
 * Focus narrowing: when the run is scoped to one pattern (--skill/--pattern),
 * run-eval.mjs sets SKILLS_EVAL_FOCUS_PATTERN to that id so the judge scores
 * ONLY that pattern — matching the prompt subset and speeding iteration. When
 * unset, the judge scores the full pattern set.
 */
const FOCUS_ID = process.env.SKILLS_EVAL_FOCUS_PATTERN
  ? Number(process.env.SKILLS_EVAL_FOCUS_PATTERN)
  : null;
const PATTERNS =
  FOCUS_ID != null ? ALL_PATTERNS.filter((p) => p.id === FOCUS_ID) : ALL_PATTERNS;
const PATTERN_COUNT = ALL_PATTERNS.length;

const PATTERN_LIST_TEXT = PATTERNS.map(
  (p) => `${p.id}. ${p.name}`,
).join('\n');

/**
 * Cross-cutting guidance docs (anti-patterns, placement, proxy/facade, config
 * troubleshooting) + SKILL.md — context the judge reads to interpret the
 * numbered patterns, not scored separately. Same references-dir override as
 * ALL_PATTERNS so a compare-mode snapshot judges against its own guidance.
 */
const GENERAL_GUIDANCE = loadGeneralGuidance(
  process.env.ADHERENCE_REFERENCES_DIR || undefined,
);

/** Per-pattern verdict schema. */
const patternVerdictSchema = z.object({
  id: z.number().describe(`Pattern number, 1-${PATTERN_COUNT}.`),
  verdict: z
    .enum(['followed', 'violated', 'not-applicable'])
    .describe(
      'followed = the code correctly applies this pattern; violated = the code breaks it; not-applicable = this task did not require touching this pattern.',
    ),
  severity: z
    .enum(['high', 'medium', 'low', 'none'])
    .describe('Impact of a violation. Use "none" when followed or not-applicable.'),
  evidence: z
    .string()
    .describe('A file path and/or short code quote supporting the verdict. Empty if not-applicable.'),
  rationale: z.string().describe('One sentence explaining the verdict.'),
});

const adherenceSchema = z.object({
  overallScore: z
    .number()
    .describe(
      'Overall Spartacus-idiomatic score from 0 to 100. 100 = flawless idiomatic Spartacus code; 0 = ignores every applicable Spartacus pattern. Judge only the patterns that apply to this task.',
    ),
  patterns: z
    .array(patternVerdictSchema)
    .describe('One entry per applicable pattern. Patterns the task never touches may be omitted or marked not-applicable.'),
  summary: z
    .string()
    .describe('2-3 sentence summary of how idiomatic the code is and the biggest issues.'),
});

/**
 * Build the judge prompt. Deliberately arm-agnostic: no mention of
 * "skills", "bare", or which condition produced the code.
 *
 * The rubric is the shipped skill itself: a numbered pattern list, then each
 * pattern's *verbatim* rule body under "=== AUTHORITATIVE RULES ===", then the
 * cross-cutting guidance. The judge is told the rules are authoritative —
 * including every exception / "Case A/B" / permitted approach they describe —
 * so it can't invent a rule stricter than what the skill teaches. This is what
 * keeps the ruler coupled to the skill by construction.
 */
function buildJudgePrompt(taskText) {
  const rubric = PATTERNS.map(
    (p) => `### PATTERN ${p.id}: ${p.name}\n\n${p.body}`,
  ).join('\n\n---\n\n');

  const general = GENERAL_GUIDANCE.map(
    (g) => `### ${g.file}\n\n${g.body}`,
  ).join('\n\n---\n\n');

  return [
    'You are a senior SAP Spartacus (SAP Commerce Cloud composable storefront) code reviewer.',
    'You are given the source files an AI generated to implement a task in a Spartacus Angular application, plus the task description.',
    '',
    'Judge ONLY how idiomatic the code is with respect to established Spartacus conventions — not general code style, not whether it would compile.',
    '',
    'The patterns you score, by number:',
    '',
    PATTERN_LIST_TEXT,
    '',
    '=== AUTHORITATIVE RULES ===',
    '',
    'The following are the EXACT rules for each pattern. They are authoritative.',
    'Judge strictly against these rules AS WRITTEN — including every exception,',
    '"Case A / Case B", and explicitly-permitted approach they describe. Do NOT',
    'invent a stricter rule than the text below. If a rule says an approach "is',
    'fine" or is permitted in some case, then that approach is FOLLOWED (not a',
    'violation) when the code matches that case. When a rule has multiple cases',
    'with different requirements, first determine which case the code is in,',
    'then apply only that case.',
    '',
    rubric,
    '',
    '=== GENERAL GUIDANCE (context, not separately scored) ===',
    '',
    general,
    '',
    '=== HOW TO JUDGE ===',
    '',
    '- The generated files are a DIFF applied on top of an existing, working',
    '  Spartacus base app — you see only what the AI added or changed, not the',
    '  whole project. Judge what the diff shows; do not penalize a pattern for',
    '  boilerplate that would already exist in the untouched base app.',
    '- Only judge patterns actually relevant to THIS task. Mark a pattern',
    '  "not-applicable" when the task never required touching it, OR when you',
    '  cannot determine applicability from the diff alone (see the per-pattern',
    '  notes below). Do NOT guess a violation from missing context.',
    '- "violated" means the code does something these rules explicitly reject.',
    '- "followed" means the code demonstrably applies the rule correctly (cite',
    '  evidence), OR correctly uses an approach the rule permits for its case.',
    '- Cite a file path or a short code quote as evidence for every non-N/A verdict.',
    '- overallScore reflects the balance of followed vs. violated patterns',
    '  weighted by severity, considering only applicable patterns.',
    '',
    'Per-pattern applicability notes:',
    '- PATTERN 4 (injector placement): to judge this you need BOTH (a) evidence',
    '  the diff provides a customization (service override / component mapping /',
    '  config) AND (b) evidence of whether the target feature is lazy- or',
    '  eager-loaded. If the diff does not reveal the feature\'s loading mode',
    '  (e.g. no featureModules import() map is visible), mark not-applicable',
    '  rather than assuming. Providing an override in the root/AppModule is',
    '  CORRECT for an eager feature — only flag it violated with evidence the',
    '  feature is lazy-loaded.',
    '- PATTERN 10 (check existing features first): this is a research step that',
    '  usually leaves no trace in the diff. Mark it "violated" ONLY when the',
    '  code clearly reimplements a NAMED, known out-of-the-box Spartacus feature',
    '  from scratch. Building a genuinely custom feature is CORRECT and is',
    '  "followed"/N-A, not a violation. When you cannot tell, use not-applicable.',
    '',
    'TASK GIVEN TO THE GENERATING AI:',
    '"""',
    taskText,
    '"""',
    '',
    'Return your verdict as a SINGLE JSON object and NOTHING else (no prose, no markdown fences). Shape:',
    '{',
    '  "overallScore": <integer 0-100, idiomatic score over applicable patterns>,',
    '  "patterns": [',
    `    { "id": <1-${PATTERN_COUNT}>, "verdict": "followed"|"violated"|"not-applicable", "severity": "high"|"medium"|"low"|"none", "evidence": "<file path or short quote>", "rationale": "<one sentence>" }`,
    '  ],',
    '  "summary": "<2-3 sentence overall summary>"',
    '}',
    'Include one entry per applicable pattern (omit or mark not-applicable those the task never touches).',
    '',
    'The generated source files follow. Review them and return ONLY the JSON.',
  ].join('\n');
}

/**
 * Parse the judge's text response into a validated verdict object. The model
 * is asked for bare JSON, but be defensive: strip markdown fences and pull
 * the outermost {...} if it wrapped the JSON in prose. Returns null if it
 * can't be parsed/validated.
 */
function parseJudgeOutput(text) {
  if (!text) return null;
  let raw = String(text).trim();
  // Strip ```json ... ``` fences if present.
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  // Fall back to the outermost brace span.
  if (raw[0] !== '{') {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    raw = raw.slice(start, end + 1);
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  const validated = adherenceSchema.safeParse(parsed);
  return validated.success ? validated.data : null;
}

/** Map a 0–100 score to the harness 0–1 coefficient. */
function scoreToCoefficient(score) {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));
  return clamped / 100;
}

/** @type {import('web-codegen-scorer').LLMBasedRating} */
export const spartacusAdherenceRating = {
  kind: RatingKind.LLM_BASED,
  id: 'spartacus-pattern-adherence',
  name: 'Spartacus Pattern Adherence (LLM-judged)',
  description:
    'LLM judge scores the generated code against the Spartacus patterns (loaded from reference-file frontmatter) and returns a per-pattern verdict. Primary skills-impact metric.',
  category: RatingCategory.HIGH_IMPACT,
  scoreReduction: '100%',
  groupingLabels: ['llm-judge', 'spartacus-adherence'],
  rate: async (ctx) => {
    // Blind-to-condition guard: strip any file under a .claude/ directory
    // that might have leaked into outputFiles. (The runner already excludes
    // **/.claude/**, but defend against config drift.)
    const files = (ctx.outputFiles ?? []).filter(
      (f) => !/(^|\/)\.claude\//.test(f.filePath),
    );

    if (files.length === 0) {
      return {
        state: RatingState.SKIPPED,
        message: 'No generated files to judge.',
      };
    }

    const contextMessage = [
      'Generated files:',
      ...files.map((f) => `\n=== ${f.filePath} ===\n${f.code}`),
    ].join('\n');

    // Plain generateText (NOT generateConstrained) — see header comment.
    // We ask for JSON in the prompt and parse it ourselves.
    let output;
    let usage = null;
    try {
      const res = await generateText({
        model: getProvider()(JUDGE_MODEL),
        abortSignal: ctx.abortSignal,
        maxRetries: 2,
        prompt: `${buildJudgePrompt(ctx.fullPromptText)}\n\n${contextMessage}`,
      });
      usage = res.usage || null;
      output = parseJudgeOutput(res.text);
    } catch (e) {
      return {
        state: RatingState.SKIPPED,
        message: `Adherence judge failed for ${ctx.currentPromptDef?.name ?? 'prompt'} using ${JUDGE_MODEL}: ${e?.message ?? e}`,
      };
    }

    if (!output) {
      return {
        state: RatingState.SKIPPED,
        message: `Adherence judge returned unparseable output for ${ctx.currentPromptDef?.name ?? 'prompt'} using ${JUDGE_MODEL}.`,
      };
    }

    // Flatten per-pattern verdicts into the `categories` list (the only
    // structured detail field the harness renders). Store the full verdict
    // in the message so the report can reconstruct the comparison.
    const categories = (output.patterns ?? [])
      .filter((p) => p.verdict !== 'not-applicable')
      .map((p) => {
        const meta = ALL_PATTERNS.find((x) => x.id === p.id);
        const label = meta ? meta.name : `Pattern ${p.id}`;
        return {
          name: `[${p.verdict}${p.severity && p.severity !== 'none' ? `/${p.severity}` : ''}] ${label}`,
          message: [p.rationale, p.evidence].filter(Boolean).join(' — '),
        };
      });

    // Persist the raw validated verdict as a machine-readable sidecar so the
    // report can read structured per-pattern data (the harness only keeps a
    // flattened `message` in assessment.json). Best-effort: never fail the
    // rating over a write error.
    try {
      const envName = (ctx.environment?.displayName ?? 'env')
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase();
      // Include the GENERATOR model in the key — otherwise the Opus run
      // overwrites the Haiku run's sidecars within the same condition
      // (same env + same prompt).
      //
      // NB: `ctx.model` is NOT the generator here — in this web-codegen-scorer
      // version the rating context's `model` is the AUTORATER model (the same
      // for every generator run), so keying on it collapses all generators to
      // one filename. run-eval.mjs passes the real generator model via
      // SKILLS_GEN_MODEL; prefer it and fall back to ctx.model only if unset.
      const generatorModel = process.env.SKILLS_GEN_MODEL ?? ctx.model ?? 'model';
      const genModel = generatorModel.replace(/[^a-z0-9.]+/gi, '-').toLowerCase();
      const promptName = ctx.currentPromptDef?.name ?? 'prompt';
      mkdirSync(VERDICT_DIR, { recursive: true });
      writeFileSync(
        join(VERDICT_DIR, `${envName}__${genModel}__${promptName}.json`),
        JSON.stringify(
          {
            environment: ctx.environment?.displayName,
            generatorModel,
            prompt: promptName,
            judgeModel: JUDGE_MODEL,
            overallScore: output.overallScore,
            summary: output.summary,
            patterns: output.patterns,
          },
          null,
          2,
        ),
      );
    } catch {
      // ignore — the score + message in assessment.json are still authoritative
    }

    return {
      state: RatingState.EXECUTED,
      coefficient: scoreToCoefficient(output.overallScore),
      message: `Adherence score ${output.overallScore}/100 (judge: ${JUDGE_MODEL})`,
      tokenUsage: {
        inputTokens: usage?.inputTokens ?? 0,
        outputTokens: usage?.outputTokens ?? 0,
        totalTokens: usage?.totalTokens ?? 0,
        thinkingTokens: usage?.thinkingTokens ?? 0,
      },
      details: {
        summary: `${output.overallScore}/100 — ${output.summary}`,
        categories,
      },
    };
  },
};
