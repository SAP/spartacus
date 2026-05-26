/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node, SourceFile } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { removeImportUsingTsMorph } from '../shared';
import { APP_CONFIG_SERVER } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { getAppConfigServerProviders } from './get-app-config-server-providers';

/**
 * Updates app.config.server.ts for SSR standalone apps:
 * - Adds importProvidersFrom(AppServerModule) to providers
 * - Removes withRoutes(serverRoutes) from provideServerRendering
 */
export function updateAppConfigServer(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${APP_CONFIG_SERVER}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const serverConfigFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(APP_CONFIG_SERVER)
      );

      if (serverConfigFile) {
        removeProvideServerRenderingWithRoutes(serverConfigFile);
        addImportProvidersFromAppServerModule(serverConfigFile);
        formatFile(serverConfigFile);
        tree.overwrite(
          serverConfigFile.getFilePath(),
          serverConfigFile.getFullText()
        );

        context.logger.info(`✅ Updated ${APP_CONFIG_SERVER}`);
        break;
      }
    }

    if (options.debug) {
      context.logger.info(`✅ App config server update complete.`);
    }

    return tree;
  };
}

/**
 * Adds `importProvidersFrom(AppServerModule)` to providers array.
 * And adds import:
 * ```
 * import { AppServerModule } from './app.module.server';
 * ```
 */
function addImportProvidersFromAppServerModule(sourceFile: SourceFile): void {
  // Add imports for AppServerModule and importProvidersFrom
  createImports(sourceFile, [
    {
      moduleSpecifier: './app.module.server',
      namedImports: ['AppServerModule'],
    },
    {
      moduleSpecifier: '@angular/core',
      namedImports: ['importProvidersFrom'],
    },
  ]);

  // Add importProvidersFrom(AppServerModule) to providers array
  const providersArray = getAppConfigServerProviders(sourceFile);

  if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
    const providerContent = 'importProvidersFrom(AppServerModule)';
    const elements = providersArray.getElements();
    const alreadyExists = elements.some(
      (element) => element.getText() === providerContent
    );

    if (!alreadyExists) {
      providersArray.addElement(providerContent);
    }
  }
}

/**
 * Removes `withRoutes(serverRoutes)` from app.config.server.ts:
 * And removes imports
 * ```
 * import { serverRoutes } from './app.routes.server';
 * import { withRoutes } from '@angular/ssr';
 * ```
 */
function removeProvideServerRenderingWithRoutes(sourceFile: SourceFile): void {
  // Remove unused imports
  removeImportUsingTsMorph(sourceFile, {
    importPath: './app.routes.server',
    importName: 'serverRoutes',
  });

  removeImportUsingTsMorph(sourceFile, {
    importPath: '@angular/ssr',
    importName: 'withRoutes',
  });

  // Remove withRoutes argument from provideServerRendering
  const providersArray = getAppConfigServerProviders(sourceFile);

  if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
    const elements = providersArray.getElements();

    elements.forEach((element) => {
      if (Node.isCallExpression(element)) {
        const expression = element.getExpression();
        if (expression.getText() === 'provideServerRendering') {
          // Remove withRoutes argument if present
          const args = element.getArguments();
          const withRoutesIndex = args.findIndex(
            (arg) =>
              Node.isCallExpression(arg) &&
              arg.getExpression().getText() === 'withRoutes'
          );
          if (withRoutesIndex !== -1) {
            element.removeArgument(withRoutesIndex);
          }
        }
      }
    });
  }
}
