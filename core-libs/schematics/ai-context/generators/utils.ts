/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export const AI_CONTEXT_ROOT = path.resolve(__dirname, '..');
export const SKILLS_ROOT = path.join(AI_CONTEXT_ROOT, 'skills');
export const CLAUDE_MD_PATH = path.join(AI_CONTEXT_ROOT, 'CLAUDE.md');
export const OUTPUT_ROOT = path.resolve(
  AI_CONTEXT_ROOT,
  '..',
  'src',
  'add-spartacus',
  'files',
  'ai-context'
);

export interface SkillReference {
  fileName: string;
  content: string;
}

export interface Skill {
  name: string;
  description: string;
  body: string;
  references: SkillReference[];
}

export function listSkills(): Skill[] {
  return fs
    .readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((name) => readSkill(name));
}

function readSkill(name: string): Skill {
  const skillMdPath = path.join(SKILLS_ROOT, name, 'SKILL.md');
  const raw = fs.readFileSync(skillMdPath, 'utf8');
  const { description, body } = parseFrontmatter(raw, skillMdPath);
  const refsDir = path.join(SKILLS_ROOT, name, 'references');
  const references: SkillReference[] = fs.existsSync(refsDir)
    ? fs
        .readdirSync(refsDir)
        .filter((f) => f.endsWith('.md'))
        .sort()
        .map((fileName) => ({
          fileName,
          content: fs.readFileSync(path.join(refsDir, fileName), 'utf8'),
        }))
    : [];
  return { name, description, body, references };
}

function parseFrontmatter(
  raw: string,
  source: string
): { description: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(
      `Missing YAML frontmatter in ${source}. Every SKILL.md must start with a '---' block declaring 'name' and 'description'.`
    );
  }
  const fm = match[1];
  const body = match[2];
  const descLine = fm.match(/^description:\s*(.+)$/m);
  if (!descLine) {
    throw new Error(
      `Missing 'description' field in YAML frontmatter of ${source}.`
    );
  }
  return { description: descLine[1].trim(), body };
}

export function stripVersionComment(body: string): string {
  return body.replace(/^\s*<!--\s*spartacus-version:[^>]+-->\s*\n?/, '');
}

export function stripSupplementalSection(body: string): string {
  const marker = /\n##\s+Supplemental Information\b/;
  const match = body.match(marker);
  if (!match || match.index === undefined) return body;
  return body.slice(0, match.index).trimEnd();
}

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function rimraf(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}

export function writeFile(dest: string, content: string): void {
  ensureDir(path.dirname(dest));
  const normalized = content.endsWith('\n') ? content : content + '\n';
  fs.writeFileSync(dest, normalized, 'utf8');
}

export function copyFile(src: string, dest: string): void {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}
