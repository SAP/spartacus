/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node, SourceFile } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { createImports } from '../shared/utils/import-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { getAppConfigProviders } from '../add-ssr/get-app-config-providers';

/**
 * Updates app.config.ts
 */
export function updateAppConfig(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating app.config.ts...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const appConfigFile = appSourceFiles.find((file) =>
        file.getFilePath().includes('app.config.ts')
      );
      debugger;
      if (appConfigFile) {
        addAppModule(appConfigFile);
        tree.overwrite(
          appConfigFile.getFilePath(),
          appConfigFile.getFullText()
        );
        if (options.debug) {
          context.logger.info(
            `✅ Updated app.config.ts in project using tsconfig: ${tsconfigPath}`
          );
        }
      }
    }
    return tree;
  };
}

/**
 * Adds `importProvidersFrom(AppModule)` to providers array.
 * And adds import:
 * ```
 * import { AppModule } from './app.module';
 * ```
 */
function addAppModule(file: SourceFile): void {
  // Add imports for AppModule and importProvidersFrom
  createImports(file, [
    {
      moduleSpecifier: './app.module',
      namedImports: ['AppModule'],
    },
    {
      moduleSpecifier: '@angular/core',
      namedImports: ['importProvidersFrom'],
    },
  ]);

  // Add importProvidersFrom(AppModule) to providers array
  const providersArray = getAppConfigProviders(file);
  debugger;
  if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
    const providerContent = 'importProvidersFrom(AppModule)';
    const elements = providersArray.getElements();
    const alreadyExists = elements.some(
      (element) => element.getText() === providerContent
    );

    if (!alreadyExists) {
      providersArray.addElement(providerContent);
    }
  }
}
