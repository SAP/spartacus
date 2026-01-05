/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Removes the `tsconfig.server.json` file from the project,
 * to align with the new Angular v17 standards.
 */
export function removeTsConfigServer(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsconfigServerPath = 'tsconfig.server.json';

    context.logger.info(`\n⏳ Removing ${tsconfigServerPath}...`);

    if (!tree.exists(tsconfigServerPath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${tsconfigServerPath} file not found`,
        context
      );
      return;
    }

    tree.delete(tsconfigServerPath);

    context.logger.info(`✅ Removed ${tsconfigServerPath}`);
  };
}
