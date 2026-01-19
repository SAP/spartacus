/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node, SourceFile } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { getAppConfigProviders } from '../add-ssr/get-app-config-providers';
import { createImports } from '../shared/utils/import-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

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
      if (appConfigFile) {
        addProvideHttpClient(appConfigFile);
        addImportProvidersFromAppModule(appConfigFile);
        tree.overwrite(
          appConfigFile.getFilePath(),
          appConfigFile.getFullText()
        );
        if (options.debug) {
          context.logger.info(`✅ Updated app.config.ts`);
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
function addImportProvidersFromAppModule(sourceFile: SourceFile): void {
  // Add imports for AppModule and importProvidersFrom
  createImports(sourceFile, [
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
  const providersArray = getAppConfigProviders(sourceFile);
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

function addProvideHttpClient(sourceFile: SourceFile): void {
  // Add imports for provideHttpClient, withFetch, withInterceptorsFromDi
  createImports(sourceFile, [
    {
      moduleSpecifier: '@angular/common/http',
      namedImports: [
        'provideHttpClient',
        'withFetch',
        'withInterceptorsFromDi',
      ],
    },
  ]);

  // Add provideHttpClient(withFetch(), withInterceptorsFromDi()) to providers array
  const providersArray = getAppConfigProviders(sourceFile);
  if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
    const providerContent =
      'provideHttpClient(withFetch(), withInterceptorsFromDi())';
    const elements = providersArray.getElements();
    const alreadyExists = elements.some(
      (element) => element.getText() === providerContent
    );

    if (!alreadyExists) {
      providersArray.addElement(providerContent);
    }
  }
}
