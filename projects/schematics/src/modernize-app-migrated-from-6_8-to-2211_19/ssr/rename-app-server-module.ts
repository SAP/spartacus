/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Renames `app.server.module.ts` to `app.module.server.ts`
 * to align with new Angular v17 standards.
 */
export function renameAppServerModule(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    enum AppServerModulePaths {
      old = 'src/app/app.server.module.ts',
      new = 'src/app/app.module.server.ts',
    }
    context.logger.info(
      `\n⏳ Renaming ${AppServerModulePaths.old} to ${AppServerModulePaths.new}...`
    );

    if (!tree.exists(AppServerModulePaths.old)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${AppServerModulePaths.old} file not found`,
        context
      );
      return;
    }

    const content = tree.read(AppServerModulePaths.old);
    if (!content) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Failed to read ${AppServerModulePaths.old} file`,
        context
      );
      return;
    }

    tree.create(AppServerModulePaths.new, content.toString());
    tree.delete(AppServerModulePaths.old);

    context.logger.info(
      `✅ Renamed ${AppServerModulePaths.old} to ${AppServerModulePaths.new}`
    );
  };
}
