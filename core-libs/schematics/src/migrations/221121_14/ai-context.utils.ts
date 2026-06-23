/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import * as readline from 'readline';
import { AiTool } from '../../add-spartacus/schema';
import { getPrefixedSpartacusSchematicsVersion } from '../../shared/utils/package-utils';

export const SKILLS_PACKAGE = '@spartacus/skills';

const SPARTACUS_SCHEMATICS = '@spartacus/schematics';
const AI_CONTEXT_SCHEMATIC = 'ai-context';
const SKILL_DIR = 'spartacus-developer';

export const SUPPORTED_TOOLS: readonly AiTool[] = ['claude', 'cursor'];

const TOOL_LABEL: Record<AiTool, string> = {
  claude: 'Claude (.claude/skills/spartacus-developer/)',
  cursor: 'Cursor (.cursor/skills/spartacus-developer/)',
};

const TOOL_BASE_DIR: Record<AiTool, string> = {
  claude: '.claude',
  cursor: '.cursor',
};

function skillDirForTool(tool: AiTool): string {
  return `${TOOL_BASE_DIR[tool]}/skills/${SKILL_DIR}`;
}

/**
 * A project counts as opted-in for a tool when the skill folder exists in it.
 */
export function detectOptedInTools(tree: Tree): AiTool[] {
  return SUPPORTED_TOOLS.filter((tool) => {
    const dir = tree.getDir(skillDirForTool(tool));
    return dir.subfiles.length > 0 || dir.subdirs.length > 0;
  });
}

/**
 * Migrations run non-interactively in CI / `--force`; callers must guard on this
 * before prompting and fall back to a printed notice otherwise.
 */
export function isInteractiveTerminal(): boolean {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function promptYesNo(question: string): Promise<boolean> {
  const answer = (await ask(`${question} (Y/n) `)).toLowerCase();
  if (!answer) {
    return true;
  }
  return answer === 'y' || answer === 'yes';
}

export async function promptTools(): Promise<AiTool[]> {
  const tools: AiTool[] = [];
  for (const tool of SUPPORTED_TOOLS) {
    if (await promptYesNo(`  Configure ${TOOL_LABEL[tool]}?`)) {
      tools.push(tool);
    }
  }
  return tools;
}

/**
 * Copy depends on the install task so it runs only once `@spartacus/skills` is
 * present in `node_modules`.
 */
export function scheduleSkillsInstallAndCopy(
  tree: Tree,
  context: SchematicContext,
  tools: AiTool[]
): void {
  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Dev,
    name: SKILLS_PACKAGE,
    version: getPrefixedSpartacusSchematicsVersion(),
    overwrite: false,
  });

  const installTaskId = context.addTask(new NodePackageInstallTask());
  context.addTask(
    new RunSchematicTask(SPARTACUS_SCHEMATICS, AI_CONTEXT_SCHEMATIC, {
      aiTools: tools,
    }),
    [installTaskId]
  );
}

/**
 * No install task: the `ng update` package group already bumped and reinstalled
 * the package, so this only re-copies the freshly installed skill.
 */
export function scheduleSkillsCopy(
  context: SchematicContext,
  tools: AiTool[]
): void {
  context.addTask(
    new RunSchematicTask(SPARTACUS_SCHEMATICS, AI_CONTEXT_SCHEMATIC, {
      aiTools: tools,
    })
  );
}

export function printSkillsNotice(context: SchematicContext): void {
  const skillsVersion = getPrefixedSpartacusSchematicsVersion();
  context.logger.info(
    [
      '',
      '✨ Install new AI skills for Spartacus development (Claude / Cursor).',
      `   The ${SKILLS_PACKAGE} package ships guidance that helps AI assistants`,
      '   follow Spartacus best practices. To add it to this project:',
      '',
      `     npm install --save-dev ${SKILLS_PACKAGE}@${skillsVersion}`,
      `     ng g ${SPARTACUS_SCHEMATICS}:${AI_CONTEXT_SCHEMATIC}`,
      '',
      `   The schematic copies the ${SKILL_DIR} skill into .claude/skills/${SKILL_DIR}/`,
      `   and/or .cursor/skills/${SKILL_DIR}/.`,
      '',
      `   Prefer not to use the schematic? Copy the skill manually — see the`,
      `   ${SKILLS_PACKAGE} README.`,
      '',
    ].join('\n')
  );
}
