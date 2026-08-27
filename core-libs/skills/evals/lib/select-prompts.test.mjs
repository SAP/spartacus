// @ts-check
/**
 * Test for the prompt selector. Run: node evals/lib/select-prompts.test.mjs
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { selectPrompts, loadManifest } from './select-prompts.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const PROMPTS = resolve(HERE, '../prompts');

let n = 0;
function assert(cond, msg) {
  n++;
  if (!cond) throw new Error(`FAIL: ${msg}`);
  console.log(`  ✓ ${msg}`);
}
function throws(fn, msg) {
  n++;
  try { fn(); } catch { console.log(`  ✓ ${msg}`); return; }
  throw new Error(`FAIL (expected throw): ${msg}`);
}

// evals.json ↔ .md cross-check passes for the real files
const entries = loadManifest(PROMPTS);
assert(entries.length === 15, `evals.json has 15 prompts (got ${entries.length})`);
assert(entries.every((e) => Array.isArray(e.assertions) && e.assertions.length > 0), 'every eval has assertions');

// full suite when no filter
const full = selectPrompts({ promptsDir: PROMPTS });
assert(full.selected.length === 15, 'no filter → all 15 prompts');
assert(full.patternId === null, 'no filter → patternId null');

// narrow by --skill=styling (pattern 8) — should be a strict subset
const styling = selectPrompts({ promptsDir: PROMPTS, skill: 'styling' });
assert(styling.patternId === 8, '--skill=styling resolves to pattern 8');
assert(styling.selected.length > 0 && styling.selected.length < 15, `styling subset is 1..14 (got ${styling.selected.length})`);
assert(styling.selected.includes('exp-16-trust-badges'), 'styling subset includes trust-badges (targets 8)');
assert(!styling.selected.includes('exp-02-override-product-card'), 'styling subset excludes prod-card (no target 8)');

// narrow by --pattern=1 (HttpClient) matches --skill=backend-communication
const byId = selectPrompts({ promptsDir: PROMPTS, pattern: 1 });
const bySlug = selectPrompts({ promptsDir: PROMPTS, skill: 'backend-communication' });
assert(JSON.stringify(byId.selected) === JSON.stringify(bySlug.selected), '--pattern=1 === --skill=backend-communication');

// error cases
throws(() => selectPrompts({ promptsDir: PROMPTS, skill: 'nonesuch' }), 'unknown --skill throws');
throws(() => selectPrompts({ promptsDir: PROMPTS, pattern: 999 }), 'unknown --pattern throws');

console.log(`\n${n} assertions passed.`);
