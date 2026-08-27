// @ts-check
/**
 * Aggregate eval run output into two JSON files the report consumes:
 *   - matrix-results.json      per-arm overall + per-experiment adherence/regex
 *   - pattern-comparison.json  per-pattern followed/violated counts, baseline
 *                              vs. treatment, across all models
 *
 * Works for both modes:
 *   impact  — conditions are "bare" (baseline) vs "skills" (treatment)
 *   compare — conditions are "baseline" (skill snapshot) vs "current"
 * The condition is derived from each run's displayName; the "treatment" arm
 * is whichever is NOT the baseline.
 *
 * Reads timestamped report dirs (authoritative generator model in groups.json)
 * + per-experiment assessment.json + the .adherence-verdicts sidecars.
 */
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPatterns } from '../lib/patterns.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPORTS = join(ROOT, '.web-codegen-scorer/reports');
const VERDICTS = join(ROOT, '.adherence-verdicts');
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));

if (!existsSync(REPORTS)) {
  console.error(`No reports found at ${REPORTS}. Run an eval first.`);
  process.exit(1);
}

/** Classify an arm's displayName into baseline vs treatment. */
function conditionOf(displayName) {
  const d = displayName.toLowerCase();
  if (d.includes('bare') || d.includes('baseline')) return 'baseline';
  return 'treatment'; // "With Skills" / "Skill Current"
}

// --- collect all runs ---
const arms = [];
for (const envSlug of readdirSync(REPORTS)) {
  const envDir = join(REPORTS, envSlug);
  for (const ts of readdirSync(envDir)) {
    const runDir = join(envDir, ts);
    const groupsPath = join(runDir, 'groups.json');
    if (!existsSync(groupsPath)) continue;
    const g = read(groupsPath)[0];
    arms.push({
      condition: conditionOf(g.displayName),
      displayName: g.displayName,
      model: g.model,
      overall: g.totalPoints,
      runDir,
      timestamp: ts,
    });
  }
}

// keep latest run per (condition, model)
const latest = {};
for (const a of arms) {
  const key = `${a.condition}__${a.model}`;
  if (!latest[key] || a.timestamp > latest[key].timestamp) latest[key] = a;
}

// Only the five FAITHFUL regex checks that survived the ruler audit count
// here. The context-dependent ones (HttpClient/OnPush/styleUrls/cxUrl/SSR)
// were retired to the LLM judge — a regex can't see the context that decides
// whether they're violations (see ratings/spartacus-patterns.mjs).
const REGEX_IDS = new Set([
  'spartacus-no-loadchildren', 'spartacus-use-provideconfig',
  'spartacus-normalizer-multi', 'spartacus-no-ngrx-store',
  'spartacus-no-imperative-subscribe',
]);

const result = { arms: [], generatedFrom: {} };
for (const key of Object.keys(latest)) {
  const arm = latest[key];
  const experiments = [];
  for (const name of readdirSync(arm.runDir)) {
    const ap = join(arm.runDir, name, 'assessment.json');
    if (!existsSync(ap)) continue;
    const a = read(ap);
    let adherence = null, regexPass = 0, regexTotal = 0;
    for (const c of a.score.categories) for (const as of c.assessments) {
      if (as.id === 'spartacus-pattern-adherence') adherence = as.successPercentage ?? null;
      if (REGEX_IDS.has(as.id)) { regexTotal++; if (as.state === 0 && as.successPercentage === 1) regexPass++; }
    }
    experiments.push({ prompt: name, adherence, regexPass, regexTotal });
  }
  // Headline = mean ADHERENCE across prompts (0-100), NOT groups.json
  // totalPoints. totalPoints is the composite over ALL ratings (build,
  // code-size, regex, runtime…) and is deflated by checks unrelated to
  // skill adherence — it would misrepresent the metric. successPercentage
  // is the adherence coefficient (0-1) per prompt.
  const scored = experiments.filter((e) => e.adherence != null);
  const adherenceScore = scored.length
    ? (scored.reduce((s, e) => s + e.adherence, 0) / scored.length) * 100
    : null;
  result.arms.push({
    condition: arm.condition,
    displayName: arm.displayName,
    model: arm.model,
    adherenceScore, // headline metric (mean LLM-judge adherence, 0-100)
    compositePoints: arm.overall, // wcs totalPoints, kept for reference only
    experiments,
  });
  result.generatedFrom[key] = arm.runDir.replace(ROOT + '/', '');
}
writeFileSync(join(ROOT, 'matrix-results.json'), JSON.stringify(result, null, 2));

// --- per-pattern comparison from verdict sidecars ---
const patterns = loadPatterns();
const patternName = new Map(patterns.map((p) => [p.id, p.name]));
const agg = { baseline: {}, treatment: {} };
if (existsSync(VERDICTS)) {
  for (const f of readdirSync(VERDICTS).filter((x) => x.endsWith('.json'))) {
    const d = read(join(VERDICTS, f));
    const cond = conditionOf(d.environment ?? '');
    for (const p of d.patterns ?? []) {
      const a = (agg[cond][p.id] ??= { followed: 0, violated: 0, na: 0 });
      if (p.verdict === 'followed') a.followed++;
      else if (p.verdict === 'violated') a.violated++;
      else a.na++;
    }
  }
}
const patternRows = patterns.map((p) => {
  const b = agg.baseline[p.id] || { followed: 0, violated: 0 };
  const t = agg.treatment[p.id] || { followed: 0, violated: 0 };
  return { id: p.id, name: patternName.get(p.id), baselineViol: b.violated, baselineFollow: b.followed, treatmentViol: t.violated, treatmentFollow: t.followed };
});
const patternComparison = {
  patterns: patternRows,
  totalBaselineViol: patternRows.reduce((a, p) => a + p.baselineViol, 0),
  totalTreatmentViol: patternRows.reduce((a, p) => a + p.treatmentViol, 0),
};
writeFileSync(join(ROOT, 'pattern-comparison.json'), JSON.stringify(patternComparison, null, 2));

// --- console summary + no-regression gate ---
// Release rule (see README "Release protocol"): for EVERY model, skills-arm
// mean adherence must be >= bare-arm mean. Any cell that drops below its bare
// baseline blocks the release — we never ship something that worsens a
// customer's generated code. This gate makes that rule executable: it exits
// non-zero if any complete cell regresses.
console.log('\n=== ADHERENCE (mean LLM-judge score, 0-100) by model ===\n');
const byModel = {};
for (const a of result.arms) (byModel[a.model] ??= {})[a.condition] = a.adherenceScore;
let regressed = 0;
let incomplete = 0;
for (const model of Object.keys(byModel).sort()) {
  const b = byModel[model].baseline, t = byModel[model].treatment;
  if (b == null || t == null) { console.log(`${model}: incomplete (need both arms)`); incomplete++; continue; }
  const lift = (t - b).toFixed(1), rel = b ? ((t - b) / b * 100).toFixed(0) : '—';
  const sign = t - b >= 0 ? '+' : '';
  const gate = t >= b ? 'PASS' : 'FAIL (regression — below bare)';
  if (t < b) regressed++;
  console.log(`${model.padEnd(18)}  baseline ${b.toFixed(1).padStart(5)}  →  treatment ${t.toFixed(1).padStart(5)}   (${sign}${lift}, ${sign}${rel}%)   [${gate}]`);
}
const { totalBaselineViol: bv, totalTreatmentViol: tv } = patternComparison;
console.log(`\nPattern violations: baseline ${bv} → treatment ${tv}` + (bv ? `  (${((1 - tv / bv) * 100).toFixed(0)}% fewer)` : ''));
console.log(`\nArms: ${result.arms.length} | wrote matrix-results.json + pattern-comparison.json`);

if (regressed > 0) {
  console.error(`\n✖ NO-REGRESSION GATE FAILED: ${regressed} model cell(s) dropped below bare. Release blocked — fix the skill gap before publishing.`);
  process.exit(1);
}
if (incomplete > 0) {
  console.error(`\n⚠ ${incomplete} model cell(s) incomplete (missing an arm) — gate could not fully verify. Run both arms for every model before publishing.`);
  process.exit(2);
}
console.log('\n✓ NO-REGRESSION GATE PASSED: every model cell held at or above its bare baseline.');
