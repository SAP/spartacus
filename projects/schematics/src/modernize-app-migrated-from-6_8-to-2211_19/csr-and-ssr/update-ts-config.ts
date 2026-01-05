/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'jsonc-parser';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates the `tsconfig.json` file for new Angular v17 standards.
 *
 * 1. Removes the properties `"baseUrl"`, `"forceConsistentCasingInFileNames"`, `"downlevelIteration"`,
 * 2. Adds `"skipLibCheck": true`, `"esModuleInterop": true`
 */
export function updateTsConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsconfigPath = 'tsconfig.json';
    context.logger.info(`\n⏳ Updating ${tsconfigPath}...`);

    if (!tree.exists(tsconfigPath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `${tsconfigPath} file not found`,
        context
      );
      return;
    }

    const tsConfigContent = tree.read(tsconfigPath);
    if (!tsConfigContent) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Failed to read ${tsconfigPath} file`,
        context
      );
      return;
    }

    const tsConfig = parse(tsConfigContent.toString());

    if (!tsConfig.compilerOptions) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `No compilerOptions found in ${tsconfigPath}`,
        context
      );
      return;
    }

    context.logger.info('  ↳ Removing "baseUrl" from compilerOptions');
    delete tsConfig.compilerOptions.baseUrl;

    context.logger.info(
      '  ↳ Removing "forceConsistentCasingInFileNames" from compilerOptions'
    );
    delete tsConfig.compilerOptions.forceConsistentCasingInFileNames;

    context.logger.info(
      '  ↳ Removing "downlevelIteration" from compilerOptions'
    );
    delete tsConfig.compilerOptions.downlevelIteration;

    context.logger.info('  ↳ Adding "skipLibCheck": true to compilerOptions');
    tsConfig.compilerOptions.skipLibCheck = true;

    context.logger.info(
      '  ↳ Adding "esModuleInterop": true to compilerOptions'
    );
    tsConfig.compilerOptions.esModuleInterop = true;
    delete tsConfig.compilerOptions.baseUrl;
    delete tsConfig.compilerOptions.forceConsistentCasingInFileNames;
    delete tsConfig.compilerOptions.downlevelIteration;

    tsConfig.compilerOptions.skipLibCheck = true;
    tsConfig.compilerOptions.esModuleInterop = true;

    const JSON_INDENT = 2;
    tree.overwrite(tsconfigPath, JSON.stringify(tsConfig, null, JSON_INDENT));

    context.logger.info(`✅ Updated ${tsconfigPath}`);
  };
}
