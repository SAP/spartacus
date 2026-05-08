/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CallExpression, Node, SourceFile } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { APP_CONFIG } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { getAppConfigProviders } from './get-app-config-providers';

/**
 * Updates app.config.ts
 */
export function updateAppConfigInSsr(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${APP_CONFIG}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const sourceFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(APP_CONFIG)
      );
      if (sourceFile) {
        addWithNoHttpTransferCacheToAppConfig(sourceFile);
        formatFile(sourceFile);
        tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());
        if (options.debug) {
          context.logger.info(`✅ Updated ${APP_CONFIG}`);
        }
      }
    }
    return tree;
  };
}

/**
 * Http Transfer Cache is temporarily disabled; https://jira.tools.sap/browse/CXSPA-10430
 */
function addWithNoHttpTransferCacheToAppConfig(sourceFile: SourceFile): void {
  createImports(sourceFile, [
    {
      moduleSpecifier: '@angular/platform-browser',
      namedImports: [
        'provideClientHydration',
        'withNoHttpTransferCache',
        'withEventReplay',
        'withIncrementalHydration',
      ],
    },
  ]);

  const providersArray = getAppConfigProviders(sourceFile);
  if (!providersArray || !Node.isArrayLiteralExpression(providersArray)) {
    return;
  }

  // Find existing provideClientHydration call
  const existingHydrationCall = findProvideClientHydrationCall(providersArray);

  if (existingHydrationCall) {
    // Update existing call to ensure it has both arguments
    ensureHydrationArguments(existingHydrationCall);
  } else {
    // Add new provideClientHydration call
    addProvideClientHydrationCall(providersArray);
  }
}

/**
 * Find existing provideClientHydration call in the providers array
 */
function findProvideClientHydrationCall(
  providersArray: Node
): CallExpression | undefined {
  if (!Node.isArrayLiteralExpression(providersArray)) {
    return undefined;
  }

  for (const element of providersArray.getElements()) {
    if (Node.isCallExpression(element)) {
      const expression = element.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'provideClientHydration'
      ) {
        return element;
      }
    }
  }

  return undefined;
}

/**
 * Ensure provideClientHydration has withEventReplay() and withNoHttpTransferCache()
 */
function ensureHydrationArguments(callExpression: CallExpression): void {
  const args = callExpression.getArguments();
  const argTexts = args.map((arg) => arg.getText());

  const hasEventReplay = argTexts.some((arg) =>
    arg.includes('withEventReplay')
  );
  const hasNoHttpTransferCache = argTexts.some((arg) =>
    arg.includes('withNoHttpTransferCache')
  );
  const hasIncrementalHydration = argTexts.some((arg) =>
    arg.includes('withIncrementalHydration')
  );

  const newArgs: string[] = [];

  if (!hasEventReplay) {
    newArgs.push('withEventReplay()');
  }

  if (!hasNoHttpTransferCache) {
    newArgs.push('withNoHttpTransferCache()');
  }

  if (!hasIncrementalHydration) {
    newArgs.push('withIncrementalHydration()');
  }

  if (newArgs.length > 0) {
    // Add the missing arguments
    if (args.length === 0) {
      callExpression.insertArguments(0, newArgs);
    } else {
      callExpression.addArguments(newArgs);
    }
  }
}

/**
 * Add provideClientHydration(withEventReplay(), withNoHttpTransferCache()) to providers
 */
function addProvideClientHydrationCall(providersArray: Node): void {
  if (!Node.isArrayLiteralExpression(providersArray)) {
    return;
  }

  providersArray.addElement(
    'provideClientHydration(withEventReplay(), withNoHttpTransferCache(), withIncrementalHydration())'
  );
}
