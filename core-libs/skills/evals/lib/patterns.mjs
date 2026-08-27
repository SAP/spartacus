// @ts-check
/**
 * Pattern loader — the single source of truth reader.
 *
 * Reads the YAML frontmatter of every `references/*.md` file in the skill
 * and returns the numbered Spartacus patterns. This is what makes the
 * reference files (customer-facing content) the ONE place a pattern is
 * defined: the judge builds its rubric from here, and the prompt selector
 * resolves `--skill`/`--pattern` filters from here. No hardcoded list.
 *
 * Frontmatter shape (only pattern files have it; cross-cutting helpers don't):
 *   ---
 *   pattern-id: 8
 *   name: "Use global SCSS, not component-scoped styleUrls/inline styles"
 *   regex-checks: [spartacus-no-styleurls]
 *   ---
 *
 * Deliberately dependency-free: the frontmatter is flat (scalar values +
 * one inline array), so a ~30-line parser beats pulling in a YAML lib.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/** Default references dir: ../../skills/spartacus-developer/references */
export const DEFAULT_REFERENCES_DIR = resolve(
  HERE,
  '../../skills/spartacus-developer/references',
);

/**
 * Parse the leading `---`-delimited frontmatter block of a markdown string.
 * Returns `{ frontmatter, body }`. Supports scalars, quoted strings, and
 * single-line inline arrays (`[a, b]`). Returns empty frontmatter if none.
 * @param {string} text
 */
export function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return { frontmatter: {}, body: text };
  const end = text.indexOf('\n---', 4);
  if (end === -1) return { frontmatter: {}, body: text };
  const raw = text.slice(4, end);
  // Skip past the closing `\n---` and the rest of that line (and one
  // trailing newline) to reach the body.
  const afterDelim = text.indexOf('\n', end + 1);
  const body = afterDelim === -1 ? '' : text.slice(afterDelim + 1).replace(/^\n/, '');
  /** @type {Record<string, any>} */
  const fm = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      // inline array
      fm[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (/^-?\d+$/.test(val)) {
      fm[key] = Number(val);
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '').replace(/\\"/g, '"');
    }
  }
  return { frontmatter: fm, body };
}

/**
 * @typedef {Object} Pattern
 * @property {number} id
 * @property {string} name
 * @property {string} file        reference filename (e.g. "styling.md")
 * @property {string} slug        filename without extension (e.g. "styling")
 * @property {string[]} regexChecks   rating ids from spartacus-patterns.mjs
 * @property {string} body        the reference file's markdown body (the rule
 *                                text the judge scores against — the rubric)
 */

/**
 * Load all numbered patterns from the reference frontmatter, sorted by id.
 * Cross-cutting files (no `pattern-id`) are skipped.
 * @param {string} [referencesDir]
 * @returns {Pattern[]}
 */
export function loadPatterns(referencesDir = DEFAULT_REFERENCES_DIR) {
  if (!existsSync(referencesDir)) {
    throw new Error(`References dir not found: ${referencesDir}`);
  }
  const patterns = [];
  const seen = new Map();
  for (const file of readdirSync(referencesDir).sort()) {
    if (!file.endsWith('.md')) continue;
    const { frontmatter: fm, body } = parseFrontmatter(
      readFileSync(join(referencesDir, file), 'utf8'),
    );
    const id = fm['pattern-id'];
    if (id == null) continue; // cross-cutting helper, not a numbered pattern
    if (typeof id !== 'number' || !fm.name) {
      throw new Error(`Invalid pattern frontmatter in ${file}: id=${id}, name=${fm.name}`);
    }
    if (seen.has(id)) {
      throw new Error(`Duplicate pattern-id ${id} in ${file} and ${seen.get(id)}`);
    }
    seen.set(id, file);
    patterns.push({
      id,
      name: fm.name,
      file,
      slug: basename(file, '.md'),
      regexChecks: fm['regex-checks'] ?? [],
      body: body.trim(),
    });
  }
  patterns.sort((a, b) => a.id - b.id);
  return patterns;
}

/**
 * @typedef {Object} GuidanceDoc
 * @property {string} file   filename (e.g. "proxy-facade-pattern.md", "SKILL.md")
 * @property {string} body   the markdown body
 */

/**
 * Load the cross-cutting reference docs — the files that carry NO `pattern-id`
 * (anti-patterns, placement mechanisms, proxy/facade explainer, config
 * troubleshooting) plus the top-level `SKILL.md` overview. These are context
 * the judge reads to interpret the numbered patterns correctly, but does not
 * score as a numbered pattern. Sorted by filename for stable prompts, with
 * SKILL.md first.
 * @param {string} [referencesDir]
 * @returns {GuidanceDoc[]}
 */
export function loadGeneralGuidance(referencesDir = DEFAULT_REFERENCES_DIR) {
  if (!existsSync(referencesDir)) {
    throw new Error(`References dir not found: ${referencesDir}`);
  }
  const docs = [];
  for (const file of readdirSync(referencesDir).sort()) {
    if (!file.endsWith('.md')) continue;
    const { frontmatter: fm, body } = parseFrontmatter(
      readFileSync(join(referencesDir, file), 'utf8'),
    );
    if (fm['pattern-id'] != null) continue; // numbered pattern, handled by loadPatterns
    docs.push({ file, body: body.trim() });
  }
  // Prepend the top-level SKILL.md overview (one dir up from references/).
  const skillMd = resolve(referencesDir, '..', 'SKILL.md');
  if (existsSync(skillMd)) {
    docs.unshift({
      file: 'SKILL.md',
      body: parseFrontmatter(readFileSync(skillMd, 'utf8')).body.trim(),
    });
  }
  return docs;
}
