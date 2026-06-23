/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { detectOptedInTools, scheduleSkillsCopy } from '../ai-context.utils';

/**
 * Re-copies the skill into the tools a project already opted into (no-op
 * otherwise). Registered in `migrations.json` only when the skill content
 * changes — see the @spartacus/skills README for when and how.
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const tools = detectOptedInTools(tree);
    if (tools.length === 0) {
      return;
    }

    scheduleSkillsCopy(context, tools);
    context.logger.info(
      `\nℹ️  Refreshing Spartacus AI skills (${tools.join(', ')}) to match the updated framework version.\n`
    );
  };
}
