/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'jsonc-parser';
import { printErrorWithDocsForMigrated_2211_32_To_2211_36 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Updates the `tsconfig.app.json` to adapt to the new Angular v19 standards.
 *
 * It updates the path in the "files" array from `server.ts` to `src/server.ts`.
 */
export function updateTsConfigApp(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsconfigAppPath = 'tsconfig.app.json';
    context.logger.info(`\n⏳ Updating ${tsconfigAppPath}...`);

    if (!tree.exists(tsconfigAppPath)) {
      printErrorWithDocs(`${tsconfigAppPath} file not found`, context);
      return;
    }

    const tsConfigContent = tree.read(tsconfigAppPath);
    if (!tsConfigContent) {
      printErrorWithDocs(`Failed to read ${tsconfigAppPath} file`, context);
      return;
    }

    const tsConfig = parse(tsConfigContent.toString());

    const oldPath = 'server.ts';
    const newPath = 'src/server.ts';
    context.logger.info(
      `  ↳ Updating path in "files" array from "${oldPath}" to "${newPath}"`
    );
    if (Array.isArray(tsConfig.files)) {
      const serverTsIndex = tsConfig.files.indexOf(oldPath);
      if (serverTsIndex !== -1) {
        tsConfig.files[serverTsIndex] = newPath;
      } else {
        printErrorWithDocs(
          `Path "${oldPath}" not found in "files" array`,
          context
        );
        return;
      }
    } else {
      printErrorWithDocs(
        `"files" array not found in ${tsconfigAppPath}`,
        context
      );
      return;
    }

    const JSON_INDENT = 2;
    tree.overwrite(
      tsconfigAppPath,
      JSON.stringify(tsConfig, null, JSON_INDENT)
    );
    context.logger.info(`✅ Updated ${tsconfigAppPath}`);
  };
}
