/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addImportsToServerTs } from './update-server-ts/add-imports-to-server-ts';
import { removeImportsFromServerTs } from './update-server-ts/remove-imports-from-server-ts';
import { removeReexportFromServerTs } from './update-server-ts/remove-reexport-from-server-ts';
import { removeWebpackFromServerTs } from './update-server-ts/remove-webpack-from-server-ts';
import { updateVariablesInServerTs } from './update-server-ts/update-variables-in-server-ts';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates `server.ts` file for new Angular v17 standards.
 *
 * Modernizes imports, configures new paths for `index.html` file,
 * removes Webpack-specific code, and removes obsolete export.
 */
export function updateServerTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const serverTsPath = 'server.ts';

    context.logger.info(`\n⏳ Updating ${serverTsPath} implementation...`);

    if (!tree.exists(serverTsPath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${serverTsPath} file not found`,
        context
      );
      return;
    }

    const content = tree.read(serverTsPath);
    if (!content) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Failed to read ${serverTsPath} file`,
        context
      );
      return;
    }

    let updatedContent = content.toString();
    updatedContent = removeImportsFromServerTs(updatedContent, context);
    updatedContent = addImportsToServerTs(updatedContent, context);
    updatedContent = updateVariablesInServerTs(updatedContent, context);
    updatedContent = removeWebpackFromServerTs(updatedContent, context);
    updatedContent = removeReexportFromServerTs(updatedContent, context);

    tree.overwrite(serverTsPath, updatedContent);

    context.logger.info(`✅ Updated ${serverTsPath} implementation`);
  };
}
