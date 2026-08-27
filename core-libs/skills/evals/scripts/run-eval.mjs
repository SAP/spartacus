#!/usr/bin/env node
// @ts-check
/**
 * run-eval — the single entry point for both eval use cases.
 *
 * MODES
 *   --mode=impact   (default) Bare prompt vs. with-skills. Answers "how much
 *                   does the skill improve AI-generated Spartacus code?"
 *                   Arms: template-bare, template-skills.
 *
 *   --mode=compare  Old skill vs. new skill. Answers "did my edit to the
 *                   skill help or hurt?" Arms: template-skills-baseline (a
 *                   snapshot taken before editing) vs. template-skills
 *                   (current). Take the snapshot with:
 *                     npm run init-template -- --snapshot
 *                   before editing the skill, then run --mode=compare.
 *
 * NARROWING (both optional; no filter = full 15-prompt suite)
 *   --skill=<slug>     e.g. --skill=styling   → only prompts targeting that
 *   --pattern=<id>     e.g. --pattern=8         pattern (via prompts/evals.json)
 *   --prompt-filter=<substr>   passed straight through to web-codegen-scorer
 *
 * MODEL
 *   --model=<name>     generator model (default claude-4.5-haiku; the impact
 *                      report used claude-4.5-haiku + claude-4.6-opus). Repeat
 *                      via multiple runs; this script runs ONE model per call.
 *   --limit=<n>        cap number of prompts (debug)
 *
 * Everything else (concurrency, autorater model) has sane defaults; pass
 * extra web-codegen-scorer flags after `--`.
 *
 * Auth: taken from the shell env (ANTHROPIC_AUTH_TOKEN + ANTHROPIC_BASE_URL
 * for the Hyperspace proxy) — same as release testing. No interactive login.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { selectPrompts } from '../lib/select-prompts.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const PROMPTS_DIR = join(ROOT, 'prompts');
const VERDICT_DIR = join(ROOT, '.adherence-verdicts');

// --- parse args ---
const args = process.argv.slice(2);
const passthrough = [];
const opt = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--') { passthrough.push(...args.slice(i + 1)); break; }
  const m = a.match(/^--([^=]+)=(.*)$/);
  if (m) opt[m[1]] = m[2];
  else if (a.startsWith('--')) opt[a.slice(2)] = true;
}

const mode = opt.mode ?? 'impact';
const model = opt.model ?? 'claude-4.5-haiku';
const autoraterModel = opt['autorater-model'] ?? 'claude-opus-4.5-with-thinking-16k';
const concurrency = opt.concurrency ?? '4';

if (!['impact', 'compare'].includes(mode)) {
  console.error(`Unknown --mode "${mode}". Use impact or compare.`);
  process.exit(1);
}

// --- resolve arms per mode ---
/** @type {{ label: string, template: string }[]} */
let arms;
if (mode === 'impact') {
  arms = [
    { label: 'Spartacus — Bare Prompt', template: './template-bare' },
    { label: 'Spartacus — With Skills', template: './template-skills' },
  ];
} else {
  arms = [
    { label: 'Spartacus — Skill Baseline', template: './template-skills-baseline' },
    { label: 'Spartacus — Skill Current', template: './template-skills' },
  ];
}

// --- validate templates exist ---
for (const arm of arms) {
  const abs = resolve(ROOT, arm.template);
  if (!existsSync(abs)) {
    console.error(`✗ Template missing: ${arm.template}`);
    console.error(
      mode === 'compare'
        ? '  For compare mode, snapshot the skill BEFORE editing:\n    npm run init-template -- --snapshot'
        : '  Run `npm run init-template` first.',
    );
    process.exit(1);
  }
}

// --- resolve prompt narrowing (--skill / --pattern) ---
let promptGlobs = null;
let focusPattern = null;
if (opt.skill || opt.pattern) {
  const sel = selectPrompts({
    promptsDir: PROMPTS_DIR,
    skill: opt.skill,
    pattern: opt.pattern != null ? Number(opt.pattern) : undefined,
  });
  promptGlobs = sel.selected.map((id) => `./prompts/${id}.md`);
  focusPattern = sel.patternId; // judge scores ONLY this pattern (see adherence rating)
  console.log(`▸ Narrowed: ${sel.reason}`);
  console.log(`  ${sel.selected.join(', ')}`);
}

// --- run each arm ---
console.log(`\n=== Skills eval — mode: ${mode} | model: ${model} ===`);
// Clear ONLY this invocation's verdict sidecars (same generator model), so
// re-running a model supersedes its old verdicts without wiping OTHER models'
// verdicts from earlier invocations (impact mode runs one model per call, so
// comparing two models means two calls). Sidecars are named
// `<env>__<genModel>__<prompt>.json`; match on the model slug.
if (existsSync(VERDICT_DIR)) {
  const modelSlug = model.replace(/[^a-z0-9.]+/gi, '-').toLowerCase();
  for (const f of readdirSync(VERDICT_DIR)) {
    if (f.includes(`__${modelSlug}__`)) rmSync(join(VERDICT_DIR, f), { force: true });
  }
}
let failures = 0;
for (const [i, arm] of arms.entries()) {
  console.log(`\n--- [${i + 1}/${arms.length}] ${arm.label} (${arm.template}) ---`);
  const evalArgs = [
    'web-codegen-scorer', 'eval',
    '--env=./config.mjs',
    '--runner=claude-code',
    `--model=${model}`,
    `--autorater-model=${autoraterModel}`,
    `--concurrency=${concurrency}`,
    '--limit=99',
  ];
  if (opt['prompt-filter']) evalArgs.push(`--prompt-filter=${opt['prompt-filter']}`);
  if (opt.limit) {
    // remove the default --limit=99 and use the caller's
    evalArgs.splice(evalArgs.indexOf('--limit=99'), 1);
    evalArgs.push(`--limit=${opt.limit}`);
  }
  evalArgs.push(...passthrough);

  const res = spawnSync('npx', evalArgs, {
    cwd: ROOT,
    stdio: 'inherit',
    env: {
      ...process.env,
      SKILLS_EVAL_TEMPLATE: arm.template,
      SKILLS_EVAL_LABEL: arm.label,
      // The GENERATOR model, passed explicitly so the adherence rating can key
      // its per-pattern verdict sidecars by it. Inside the rating, `ctx.model`
      // is the AUTORATER model, not the generator — so without this the Opus
      // run would overwrite the Haiku run's sidecars (identical filenames) and
      // the per-model clearing above would never match. See spartacus-adherence.mjs.
      SKILLS_GEN_MODEL: model,
      ...(promptGlobs ? { SKILLS_EVAL_PROMPT_GLOBS: JSON.stringify(promptGlobs) } : {}),
      ...(focusPattern != null ? { SKILLS_EVAL_FOCUS_PATTERN: String(focusPattern) } : {}),
    },
  });
  if (res.status !== 0) {
    failures++;
    console.error(`✗ Arm "${arm.label}" exited with code ${res.status}`);
  }
}

console.log(`\n=== Done (${arms.length - failures}/${arms.length} arms succeeded). ===`);
console.log('Next: `npm run aggregate` then `npm run report`.');
process.exit(failures ? 1 : 0);
