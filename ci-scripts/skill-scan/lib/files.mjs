import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Default scan target: the customer-shipped skill content. */
export const DEFAULT_TARGET = 'core-libs/skills/skills';

/** Directory names never scanned (deps, eval fixtures, scratch workspaces). */
export const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.web-codegen-scorer',
  'evals',
]);

/**
 * Recursively collect `.md` files under `root` (a file or directory),
 * skipping excluded directories. Missing paths yield an empty list.
 */
export function findMarkdown(root) {
  const out = [];

  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) {
          continue;
        }
        walk(join(dir, entry.name));
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        out.push(join(dir, entry.name));
      }
    }
  };

  const stat = statSync(root, { throwIfNoEntry: false });
  if (!stat) {
    return out;
  }
  if (stat.isFile()) {
    if (root.toLowerCase().endsWith('.md')) {
      out.push(root);
    }
  } else {
    walk(root);
  }
  return out;
}
