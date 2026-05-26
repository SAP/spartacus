/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  CLAUDE_MD_PATH,
  OUTPUT_ROOT,
  SKILLS_ROOT,
  copyFile,
  ensureDir,
  rimraf,
} from './utils';

const CLAUDE_OUT_ROOT = path.join(OUTPUT_ROOT, 'claude');
// Staged with `dot-` prefixes so the directories survive `npm pack`
// (npm + many global gitignores silently strip top-level
// dot-directories). The `addAiContext` rule renames `dot-claude/` →
// `.claude/` and `dot-spartacus/` → `.spartacus/` when it emits into the
// customer workspace. Skills go under `spartacus/` so they coexist with
// any custom skills the customer authors without conflict.
const CLAUDE_MASTER_OUT = path.join(
  CLAUDE_OUT_ROOT,
  'dot-spartacus',
  'CLAUDE.md'
);
const CLAUDE_SKILLS_OUT = path.join(
  CLAUDE_OUT_ROOT,
  'dot-claude',
  'skills',
  'spartacus'
);

export function generateClaude(): void {
  rimraf(CLAUDE_OUT_ROOT);
  ensureDir(CLAUDE_OUT_ROOT);
  copyFile(CLAUDE_MD_PATH, CLAUDE_MASTER_OUT);
  copyDirRecursive(SKILLS_ROOT, CLAUDE_SKILLS_OUT);
}

function copyDirRecursive(src: string, dest: string): void {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(s, d);
    } else if (entry.isFile()) {
      copyFile(s, d);
    }
  }
}

if (require.main === module) {
  generateClaude();
  console.log(`Claude output written to ${CLAUDE_OUT_ROOT}`);
}
