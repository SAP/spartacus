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
  ensureDir,
  listSkills,
  rimraf,
  stripSupplementalSection,
  stripVersionComment,
  writeFile,
} from './utils';

const AGENTS_OUT_ROOT = path.join(OUTPUT_ROOT, 'agents');
// Staged under `dot-spartacus/` so the namespaced master file survives
// `npm pack` (the `.spartacus` directory is dot-prefixed). The
// `addAiContext` rule renames `dot-spartacus/` → `.spartacus/` when it
// emits into the customer workspace, and writes a small pointer block
// in the customer's root `AGENTS.md`.
const AGENTS_OUT_FILE = path.join(
  AGENTS_OUT_ROOT,
  'dot-spartacus',
  'AGENTS.md'
);

export function generateAgents(): void {
  rimraf(AGENTS_OUT_ROOT);
  ensureDir(AGENTS_OUT_ROOT);

  const claudeContent = fs.readFileSync(CLAUDE_MD_PATH, 'utf8');
  const skillsHeading = claudeContent.indexOf('## Skills');
  const quickRefHeading = claudeContent.indexOf('## Quick Reference');
  if (skillsHeading === -1 || quickRefHeading === -1) {
    throw new Error(
      `CLAUDE.md is missing the expected '## Skills' or '## Quick Reference' headings — AGENTS.md generation cannot proceed.`
    );
  }

  const intro = claudeContent.slice(0, skillsHeading).trimEnd();
  const quickReference = claudeContent.slice(quickRefHeading).trim();
  const skills = listSkills();

  let toc = '## Skills\n\n';
  toc +=
    'Each detailed section below covers one topic. Skip to the one whose trigger applies — sections are independent and can be read in any order.\n\n';
  for (const skill of skills) {
    toc += `- **\`${skill.name}\`** — ${skill.description}\n`;
  }

  let detailed = '## Detailed guidance\n\n';
  for (const skill of skills) {
    const body = stripSupplementalSection(
      stripVersionComment(skill.body)
    ).trim();
    detailed += body + '\n\n';
    for (const ref of skill.references) {
      detailed += ref.content.trim() + '\n\n';
    }
    detailed += '---\n\n';
  }
  detailed = detailed.replace(/\n---\n\n$/, '\n');

  const out =
    intro + '\n\n' + toc + '\n' + detailed + '\n' + quickReference + '\n';
  writeFile(AGENTS_OUT_FILE, out);
}

if (require.main === module) {
  generateAgents();
  console.log(`AGENTS.md written to ${AGENTS_OUT_FILE}`);
}
