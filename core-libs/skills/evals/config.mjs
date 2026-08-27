// @ts-check
/**
 * Parameterized web-codegen-scorer environment. ONE config for every arm of
 * every mode — the arm-specific bits (which template, what to call it) come
 * from env vars set by scripts/run-eval.mjs:
 *
 *   SKILLS_EVAL_TEMPLATE   path to the project template for this arm
 *                          (template-bare / template-skills / a skill snapshot)
 *   SKILLS_EVAL_LABEL      displayName for the run (distinguishes report dirs)
 *
 * Keeping a single config guarantees the arms differ ONLY in the template —
 * the whole point of the experiment. Ratings, prompts, and the empty control
 * system prompt are identical across arms.
 *
 * Invoked as: web-codegen-scorer eval --env=./config.mjs ...
 */
import { getBuiltInRatings } from 'web-codegen-scorer';
import { spartacusPatternRatings } from './ratings/spartacus-patterns.mjs';
import { spartacusAdherenceRating } from './ratings/spartacus-adherence.mjs';

const template = process.env.SKILLS_EVAL_TEMPLATE ?? './template-bare';
const label = process.env.SKILLS_EVAL_LABEL ?? 'Spartacus — Eval';

// Narrowing: run-eval.mjs sets SKILLS_EVAL_PROMPT_GLOBS to a JSON array of
// prompt globs when --skill/--pattern subsets the suite. Defaults to all.
let prompts = ['./prompts/*.md'];
if (process.env.SKILLS_EVAL_PROMPT_GLOBS) {
  try {
    const parsed = JSON.parse(process.env.SKILLS_EVAL_PROMPT_GLOBS);
    if (Array.isArray(parsed) && parsed.length) prompts = parsed;
  } catch {
    // fall back to full suite on malformed input
  }
}

/** @type {import('web-codegen-scorer').EnvironmentConfig} */
export default {
  displayName: label,
  clientSideFramework: 'angular',

  // The single controlled variable across arms.
  projectTemplate: template,
  packageManager: 'npm',

  // No OCC backend in the eval → no runtime suite. Build success, the LLM
  // adherence judge, and the regex pattern checks still score.
  serveCommand: null,

  // Zero-byte control system prompt. Skills (when present) fire via Claude
  // Code auto-discovery of the template's .claude/skills/, not via this file.
  generationSystemPrompt: './system-instructions-empty.md',

  executablePrompts: prompts,

  // PRIMARY: LLM adherence judge. SECONDARY: deterministic regex cross-check.
  // Plus built-ins (build success, code size, etc.).
  ratings: [
    ...getBuiltInRatings(),
    ...spartacusPatternRatings,
    spartacusAdherenceRating,
  ],
};
