/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'jsonc-parser';
import { mergeArraysWithoutDuplicates } from '../../shared/utils/array-utils';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates `tsconfig.app.json` to align with new Angular v17 standards.
 *
 * 1. Adds 1 new item to the array in the property `"types"`: `"node"`
 * 2. Adds 2 new items to the in the `"files"` array: `"src/main.server.ts"` , `"server.ts"`
 */
export function updateTsConfigApp(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsconfigAppPath = 'tsconfig.app.json';

    context.logger.info(`\n⏳ Updating ${tsconfigAppPath} configuration...`);

    if (!tree.exists(tsconfigAppPath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${tsconfigAppPath} file not found`,
        context
      );
      return;
    }

    const tsConfigAppContent = tree.read(tsconfigAppPath);
    if (!tsConfigAppContent) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Failed to read ${tsconfigAppPath} file`,
        context
      );
      return;
    }

    const tsConfigApp = parse(tsConfigAppContent.toString());

    context.logger.info('  ↳ Adding "node" to "types" array');
    tsConfigApp.compilerOptions = {
      ...tsConfigApp.compilerOptions,
      types: mergeArraysWithoutDuplicates(tsConfigApp.compilerOptions?.types, [
        'node',
      ]),
    };

    const serverFiles = ['src/main.server.ts', 'server.ts'];
    context.logger.info(
      `  ↳ Adding ${serverFiles
        .map((x) => `"${x}"`)
        .join(', ')} to "files" array`
    );
    tsConfigApp.files = mergeArraysWithoutDuplicates(
      tsConfigApp.files,
      serverFiles
    );

    const JSON_INDENT = 2;
    tree.overwrite(
      tsconfigAppPath,
      JSON.stringify(tsConfigApp, null, JSON_INDENT)
    );

    context.logger.info(`✅ Updated ${tsconfigAppPath} configuration`);
  };
}
