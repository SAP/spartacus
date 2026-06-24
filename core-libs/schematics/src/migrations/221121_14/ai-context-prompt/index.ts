/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  isInteractiveTerminal,
  printSkillsNotice,
  promptTools,
  promptYesNo,
  scheduleSkillsInstallAndCopy,
} from '../ai-context.utils';

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

    context.logger.info(
      '\n✨ Spartacus can configure AI-assistant guidance (Claude / .agents) for this project.'
    );

    const wantsSkills = await promptYesNo(
      '  Install AI skills for Spartacus development?'
    );
    if (!wantsSkills) {
      context.logger.info(
        '  Skipped. Add them later with: ng g @spartacus/schematics:ai-context\n'
      );
      return;
    }

    const tools = await promptTools();
    if (tools.length === 0) {
      context.logger.info('  No AI tools selected — nothing to install.\n');
      return;
    }

    scheduleSkillsInstallAndCopy(tree, context, tools);
    context.logger.info(
      '  AI skills will be installed and copied once the update finishes.\n'
    );
  };
}
