/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { OUTPUT_ROOT, SKILLS_ROOT, copyFile, ensureDir, rimraf } from './utils';

const CURSOR_OUT_ROOT = path.join(OUTPUT_ROOT, 'cursor');
// Staged as `dot-cursor/` so it survives `npm pack` (the `.cursor`
// directory is commonly ignored globally; npm also strips many
// dot-directories on the way into the tarball). The `addAiContext` rule
// renames it back to `.cursor/` at install time. Skills go under
// `spartacus/` so they coexist with any custom skills the customer
// authors without conflict.
const CURSOR_SKILLS_OUT = path.join(
  CURSOR_OUT_ROOT,
  'dot-cursor',
  'skills',
  'spartacus'
);

export function generateCursor(): void {
  rimraf(CURSOR_OUT_ROOT);
  ensureDir(CURSOR_SKILLS_OUT);
  copyDirRecursive(SKILLS_ROOT, CURSOR_SKILLS_OUT);
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
  generateCursor();
  console.log(`Cursor output written to ${CURSOR_OUT_ROOT}`);
}
