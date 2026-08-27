// @ts-check
/**
 * Prompt selector — resolves which prompts to run given optional narrowing.
 *
 * Two narrowing dimensions (both optional; no filter = full suite):
 *   --skill=<slug>     run only prompts whose evals.json `targets` include the
 *   --pattern=<id>     pattern for that skill slug / that pattern id.
 *
 * Prompt files stay PURE task text (the harness sends them verbatim to the
 * LLM). All eval metadata lives in `prompts/evals.json` (agentskills.io shape:
 * skill_name + evals[]). `targets` are pattern ids from the reference
 * frontmatter (the single source of truth, via patterns.mjs). This keeps the
 * prompt uncontaminated while still letting us subset by pattern.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { loadPatterns } from './patterns.mjs';

/**
 * Load the eval test-case set (prompts/evals.json) and cross-check it against
 * the actual .md files. Returns normalized entries with `id` + `targets`.
 * @param {string} promptsDir
 * @returns {{ id: string, targets: number[], expected_output?: string, assertions?: string[] }[]}
 */
export function loadManifest(promptsDir) {
  const evalsPath = join(promptsDir, 'evals.json');
  if (!existsSync(evalsPath)) {
    throw new Error(`Eval test-case file not found: ${evalsPath}`);
  }
  const doc = JSON.parse(readFileSync(evalsPath, 'utf8'));
  const entries = (doc.evals ?? []).map((e) => ({
    id: e.id,
    targets: Array.isArray(e.targets) ? e.targets.map(Number) : [],
    expected_output: e.expected_output,
    assertions: e.assertions,
  }));

  // Cross-check: every .md has an evals entry and vice versa.
  const mdSlugs = new Set(
    readdirSync(promptsDir).filter((f) => f.endsWith('.md')).map((f) => basename(f, '.md')),
  );
  const evalIds = new Set(entries.map((e) => e.id));
  for (const slug of mdSlugs) {
    if (!evalIds.has(slug)) throw new Error(`Prompt ${slug}.md has no evals.json entry.`);
  }
  for (const id of evalIds) {
    if (!mdSlugs.has(id)) throw new Error(`evals.json lists "${id}" but ${id}.md does not exist.`);
  }
  return entries;
}

/**
 * Resolve the prompt ids to run.
 * @param {object} opts
 * @param {string} opts.promptsDir
 * @param {string} [opts.skill]     reference slug, e.g. "styling"
 * @param {number} [opts.pattern]   pattern id, e.g. 8
 * @param {string} [opts.referencesDir]
 * @returns {{ selected: string[], patternId: number|null, reason: string }}
 */
export function selectPrompts({ promptsDir, skill, pattern, referencesDir }) {
  const entries = loadManifest(promptsDir);

  if (skill == null && pattern == null) {
    return { selected: entries.map((e) => e.id), patternId: null, reason: 'full suite (no --skill/--pattern)' };
  }

  const patterns = loadPatterns(referencesDir);
  let patternId = pattern ?? null;
  if (skill != null) {
    const match = patterns.find((p) => p.slug === skill);
    if (!match) {
      throw new Error(`Unknown --skill "${skill}". Known: ${patterns.map((p) => p.slug).join(', ')}`);
    }
    patternId = match.id;
  }
  if (!patterns.some((p) => p.id === patternId)) {
    throw new Error(`Unknown --pattern ${patternId}. Valid ids: ${patterns.map((p) => p.id).join(', ')}`);
  }

  const selected = entries.filter((e) => e.targets.includes(patternId)).map((e) => e.id);
  if (selected.length === 0) {
    throw new Error(
      `No prompt targets pattern ${patternId}. Add it to a prompt's evals.json \`targets\`, or run the full suite.`,
    );
  }
  return {
    selected,
    patternId,
    reason: `pattern ${patternId}${skill ? ` (${skill})` : ''}: ${selected.length}/${entries.length} prompts`,
  };
}
