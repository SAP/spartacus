/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates `main.server.ts` file for new Angular v17 standards.
 *
 * 1. Changes the the export path of the `AppServerModule` from `./app/app.server.module'` to `./app/app.module.server'`.
 * 2. Exports `AppServerModule` using `as default`.
 */
export function updateMainServerTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const mainServerPath = 'src/main.server.ts';
    context.logger.info(`\n⏳ Updating ${mainServerPath}...`);

    if (!tree.exists(mainServerPath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${mainServerPath} file not found`,
        context
      );
      return;
    }

    const mainServerContent = tree.read(mainServerPath);
    if (!mainServerContent) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Failed to read ${mainServerPath} file`,
        context
      );
      return;
    }

    context.logger.info('  ↳ Updating export path of "AppServerModule"');
    const expectedPattern =
      /export \{ AppServerModule \} from ['"]\.\/app\/app\.server\.module['"];/;
    const newPattern = `export { AppServerModule as default } from './app/app.module.server';`;

    let updatedContent = mainServerContent.toString();
    if (!expectedPattern.test(updatedContent)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${mainServerPath} does not contain the expected export`,
        context
      );
      return;
    }

    updatedContent = updatedContent.replace(expectedPattern, newPattern);
    tree.overwrite(mainServerPath, updatedContent);

    context.logger.info(`✅ Updated ${mainServerPath}`);
  };
}
