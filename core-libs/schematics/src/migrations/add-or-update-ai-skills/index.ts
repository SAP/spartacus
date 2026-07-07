/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  detectInstalledTools,
  isInteractiveTerminal,
  PROMPT_INDENT,
  printSkillsNotice,
  promptTools,
  promptYesNo,
  scheduleSkillsDeleteAndCopy,
} from './ai-context.utils';

function writePromptLine(line: string): void {
  process.stdout.write(`${line ? PROMPT_INDENT + line : ''}\n`);
}

/**
 * Living migration that runs on every `ng update @spartacus/schematics`.
 * Its `version` in `migrations.json` is updated to match the package version on
 * every release so it always fires, whether the customer is installing for the
 * first time or refreshing existing skills.
 *
 * In a TTY, detects whether skills are already present and prompts accordingly
 * ("Install" vs "Update"). Then does a full delete + copy so no stale files
 * remain. In CI / `--force` it falls back to a printed notice.
 */
export function migrate(): Rule {
  return async (tree: Tree, context: SchematicContext): Promise<void> => {
    if (!isInteractiveTerminal()) {
      printSkillsNotice(context);
      return;
    }

    const installedTools = detectInstalledTools(tree);
    const isUpdate = installedTools.length > 0;
    const verb = isUpdate ? 'Update' : 'Install';

    writePromptLine('');
    writePromptLine(
      `✨ Spartacus can configure AI-assistant guidance (Claude / .agents) for this project.`
    );

    const confirmed = await promptYesNo(
      `${PROMPT_INDENT}${verb} AI skills for Spartacus development?`
    );
    if (!confirmed) {
      writePromptLine(
        `Skipped. Add or update them later with: ng g @spartacus/schematics:ai-context`
      );
      writePromptLine('');
      return;
    }

    const tools = isUpdate ? installedTools : await promptTools();

    if (tools.length === 0) {
      writePromptLine(
        `No AI tools selected — nothing to ${verb.toLowerCase()}.`
      );
      writePromptLine('');
      return;
    }

    scheduleSkillsDeleteAndCopy(tree, context, tools);
    writePromptLine(
      `AI skills will be ${isUpdate ? 'updated' : 'installed'} once the update finishes.`
    );
    writePromptLine('');
  };
}
