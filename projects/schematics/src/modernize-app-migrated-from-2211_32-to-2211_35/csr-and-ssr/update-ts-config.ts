/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'jsonc-parser';
import { printErrorWithDocsForMigrated_2211_32_To_2211_35 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * It updates the "compilerOptions" in the `tsconfig.json` file,
 * to adapt to the new Angular v19 standards.
 *
 * 1. Adds `"isolatedModules": true`
 * 2. Removes `"sourceMap"`, `"declaration"`, `"useDefineForClassFields"`, `"lib"`, `"moduleResolution"`
 */
export function updateTsConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsconfigPath = 'tsconfig.json';
    context.logger.info(`\n⏳ Updating ${tsconfigPath}...`);

    if (!tree.exists(tsconfigPath)) {
      printErrorWithDocs(`${tsconfigPath} file not found`, context);
      return;
    }

    const tsConfigContent = tree.read(tsconfigPath);
    if (!tsConfigContent) {
      printErrorWithDocs(`Failed to read ${tsconfigPath} file`, context);
      return;
    }

    const tsConfig = parse(tsConfigContent.toString());

    if (!tsConfig.compilerOptions) {
      printErrorWithDocs(
        `No compilerOptions found in ${tsconfigPath}`,
        context
      );
      return;
    }

    context.logger.info(
      '  ↳ Adding `"isolatedModules": true` to "compilerOptions"'
    );
    tsConfig.compilerOptions.isolatedModules = true;

    context.logger.info(
      '  ↳ Removing "sourceMap", "declaration", "useDefineForClassFields", "lib", "moduleResolution" from "compilerOptions"'
    );
    delete tsConfig.compilerOptions.sourceMap;
    delete tsConfig.compilerOptions.declaration;
    delete tsConfig.compilerOptions.useDefineForClassFields;
    delete tsConfig.compilerOptions.lib;
    delete tsConfig.compilerOptions.moduleResolution;

    context.logger.info(
      '  ↳ Updating "moduleResolution" to "bundler" in "compilerOptions"'
    );
    tsConfig.compilerOptions.moduleResolution = 'bundler';

    const JSON_INDENT = 2;
    tree.overwrite(tsconfigPath, JSON.stringify(tsConfig, null, JSON_INDENT));
    context.logger.info(`✅ Updated ${tsconfigPath}`);
  };
}
