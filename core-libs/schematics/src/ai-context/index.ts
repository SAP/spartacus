/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import * as path from 'path';
import { AiTool } from '../add-spartacus/schema';
import { Schema } from './schema';

const SUPPORTED_TOOLS: readonly AiTool[] = ['claude', 'agents'];

const SKILLS_PACKAGE = '@spartacus/skills';
const SKILL_DIR = 'spartacus-developer';

const SKILL_DEST: Record<AiTool, string> = {
  claude: `.claude/skills/${SKILL_DIR}`,
  agents: `.agents/skills/${SKILL_DIR}`,
};

interface SkillFile {
  relativePath: string;
  content: string;
}

/**
 * Standalone schematic that copies the Spartacus `spartacus-developer` skill
 * from an installed `@spartacus/skills` package into the project, shaped for
 * the selected AI assistants. Run it after installing `@spartacus/skills`:
 *
 *   ng g @spartacus/schematics:ai-context
 *   ng g @spartacus/schematics:ai-context --ai-tools=claude --ai-tools=cursor
 *
 * Note: Angular CLI auto-kebab-cases camelCase schema props (aiTools →
 * ai-tools) and refuses comma-separated values for array flags — repeat
 * the flag once per value.
 */
export function addAiContextSchematic(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const targets = normalize(options.aiTools);
    if (targets.length === 0) {
      if (options.debug) {
        context.logger.info(`ℹ️  Skipping AI context — no aiTools selected.`);
      }
      return;
    }

    const skillsRoot = resolveSkillsRoot();
    if (!skillsRoot) {
      context.logger.warn(
        `Could not find '${SKILLS_PACKAGE}' in node_modules. Install it first ` +
          `('npm install --save-dev ${SKILLS_PACKAGE}'), then run ` +
          `'ng generate @spartacus/schematics:ai-context'.`
      );
      return;
    }

    if (options.debug) {
      context.logger.info(`⌛️ Writing AI context for: ${targets.join(', ')}`);
    }

    const files = collectFiles(skillsRoot);
    for (const target of targets) {
      copySkill(tree, files, target, options.deleteBeforeCopy);
    }

    if (options.debug) {
      context.logger.info(`✅ AI context written.`);
    }
  };
}

/**
 * Resolves the `spartacus-developer` skill directory inside the installed
 * `@spartacus/skills` package, relative to the consuming project.
 */
function resolveSkillsRoot(): string | null {
  const override = process.env.SPARTACUS_SKILLS_DIR;
  if (override !== undefined) {
    return fs.existsSync(override) ? override : null;
  }

  try {
    const packageJsonPath = require.resolve(`${SKILLS_PACKAGE}/package.json`, {
      paths: [process.cwd()],
    });
    const root = path.join(path.dirname(packageJsonPath), 'skills', SKILL_DIR);
    if (fs.existsSync(root)) {
      return root;
    }
  } catch {
    // fall through to the explicit node_modules lookup below
  }

  const fallback = path.join(
    process.cwd(),
    'node_modules',
    '@spartacus',
    'skills',
    'skills',
    SKILL_DIR
  );
  return fs.existsSync(fallback) ? fallback : null;
}

function collectFiles(root: string): SkillFile[] {
  const out: SkillFile[] = [];
  walk(root, '', out);
  return out.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function walk(root: string, rel: string, out: SkillFile[]): void {
  const dir = path.join(root, rel);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const next = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      walk(root, next, out);
    } else if (entry.isFile()) {
      out.push({
        relativePath: next,
        content: fs.readFileSync(path.join(root, next), 'utf8'),
      });
    }
  }
}

function copySkill(
  tree: Tree,
  files: SkillFile[],
  target: AiTool,
  deleteBeforeCopy = false
): void {
  const dest = SKILL_DEST[target];
  if (deleteBeforeCopy) deleteSkillDir(tree, dest);
  writeSkillTree(tree, files, dest);
}

function deleteSkillDir(tree: Tree, destBase: string): void {
  tree.getDir(destBase).visit((filePath) => tree.delete(filePath));
}

function writeSkillTree(
  tree: Tree,
  files: SkillFile[],
  destBase: string
): void {
  for (const file of files) {
    const dest = `${destBase}/${file.relativePath}`;
    if (tree.exists(dest)) {
      tree.overwrite(dest, file.content);
    } else {
      tree.create(dest, file.content);
    }
  }
}

function normalize(input: Schema['aiTools']): AiTool[] {
  if (!input || input.length === 0) return [];
  const seen = new Set<AiTool>();
  for (const value of input) {
    if (SUPPORTED_TOOLS.includes(value)) {
      seen.add(value);
    }
  }
  return SUPPORTED_TOOLS.filter((tool) => seen.has(tool));
}
