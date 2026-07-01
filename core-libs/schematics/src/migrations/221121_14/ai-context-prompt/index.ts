/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  isInteractiveTerminal,
  printSkillsNotice,
  PROMPT_INDENT,
  promptTools,
  promptYesNo,
  scheduleSkillsInstallAndCopy,
} from '../ai-context.utils';

function writePromptLine(line: string): void {
  process.stdout.write(`${line}\n`);
}

/**
 * In a TTY, asks whether to install the skills and which tools, then installs
 * and copies them. In CI / `--force` it falls back to a printed notice.
 */
export function migrate(): Rule {
  return async (tree: Tree, context: SchematicContext): Promise<void> => {
    if (!isInteractiveTerminal()) {
      printSkillsNotice(context);
      return;
    }

    writePromptLine('');
    writePromptLine(
      `${PROMPT_INDENT}✨ Spartacus can configure AI-assistant guidance (Claude / .agents) for this project.`
    );

    const wantsSkills = await promptYesNo(
      `${PROMPT_INDENT}Install AI skills for Spartacus development?`
    );
    if (!wantsSkills) {
      writePromptLine(
        `${PROMPT_INDENT}Skipped. Add them later with: ng g @spartacus/schematics:ai-context`
      );
      writePromptLine('');
      return;
    }

    const tools = await promptTools();
    if (tools.length === 0) {
      writePromptLine(
        `${PROMPT_INDENT}No AI tools selected — nothing to install.`
      );
      writePromptLine('');
      return;
    }

    scheduleSkillsInstallAndCopy(tree, context, tools);
    writePromptLine(
      `${PROMPT_INDENT}AI skills will be installed and copied once the update finishes.`
    );
    writePromptLine('');
  };
}
