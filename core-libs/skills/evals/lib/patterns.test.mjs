// @ts-check
/**
 * Minimal test for the pattern loader (the single-source-of-truth seam).
 * Run: node evals/lib/patterns.test.mjs
 * Zero-dependency: throws on first failure, prints PASS lines otherwise.
 */
import { parseFrontmatter, loadPatterns, loadGeneralGuidance } from './patterns.mjs';

let n = 0;
function assert(cond, msg) {
  n++;
  if (!cond) throw new Error(`FAIL: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

// --- parseFrontmatter unit cases ---
{
  const { frontmatter, body } = parseFrontmatter(
    '---\npattern-id: 8\nname: "Use global SCSS"\nregex-checks: [a, b]\n---\n\n# Title\ncontent',
  );
  assert(frontmatter['pattern-id'] === 8, 'parses numeric pattern-id');
  assert(frontmatter.name === 'Use global SCSS', 'parses quoted name');
  assert(Array.isArray(frontmatter['regex-checks']) && frontmatter['regex-checks'].length === 2, 'parses inline array');
  assert(body.startsWith('# Title'), 'strips frontmatter from body');
}
{
  const { frontmatter, body } = parseFrontmatter('# No frontmatter\njust body');
  assert(Object.keys(frontmatter).length === 0, 'no frontmatter → empty object');
  assert(body.startsWith('# No frontmatter'), 'body preserved when no frontmatter');
}
{
  const { frontmatter } = parseFrontmatter('---\nname: "escaped \\" quote"\n---\n');
  assert(frontmatter.name === 'escaped " quote', 'unescapes quoted quotes');
}

// --- loadPatterns integration against the real reference files ---
{
  const patterns = loadPatterns();
  assert(patterns.length === 16, `loads exactly 16 numbered patterns (got ${patterns.length})`);
  const ids = patterns.map((p) => p.id);
  assert(JSON.stringify(ids) === JSON.stringify([...Array(16)].map((_, i) => i + 1)), 'ids are 1..16 contiguous & sorted');
  const styling = patterns.find((p) => p.slug === 'styling');
  assert(styling && styling.id === 8, 'styling.md → pattern 8');
  // Each pattern now carries its markdown body — the rubric the judge scores against.
  assert(styling.body.includes('Case A') && styling.body.includes('Case B'), 'styling body includes the Case A/B rule text');
  // Kept regex-check links survive; retired ones (e.g. spartacus-no-styleurls) do not.
  const lazy = patterns.find((p) => p.slug === 'lazy-loading');
  assert(lazy && lazy.regexChecks.includes('spartacus-no-loadchildren'), 'lazy-loading carries its kept regex-check link');
  assert(!patterns.some((p) => p.regexChecks.includes('spartacus-no-styleurls')), 'retired regex-check links removed from frontmatter');
  const backend = patterns.find((p) => p.id === 1);
  assert(backend.slug === 'backend-communication', 'pattern 1 → backend-communication');
}

// --- loadGeneralGuidance: cross-cutting docs + SKILL.md, no numbered patterns ---
{
  const guidance = loadGeneralGuidance();
  assert(guidance.length > 0, 'loads at least one general-guidance doc');
  assert(guidance[0].file === 'SKILL.md', 'SKILL.md is first');
  assert(guidance.every((g) => typeof g.body === 'string' && g.body.length > 0), 'every guidance doc has a body');
}

console.log(`\n${n} assertions passed.`);
