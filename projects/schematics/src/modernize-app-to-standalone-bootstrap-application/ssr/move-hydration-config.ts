/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import { getAppConfigProviders } from '../../add-ssr/get-app-config-providers';
import { createImports, formatFile } from '../../shared';

/**
 * Moves provideClientHydration from app.module.ts to app.config.ts
 * This is needed for SSR applications
 */
export function moveHydrationConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModulePath = 'src/app/app.module.ts';
    const appConfigPath = 'src/app/app.config.ts';

    if (!tree.exists(appModulePath)) {
      throw new Error(`File ${appModulePath} not found`);
    }

    if (!tree.exists(appConfigPath)) {
      throw new Error(`File ${appConfigPath} not found`);
    }

    context.logger.info(
      '⏳ Moving hydration config from app.module.ts to app.config.ts...'
    );

    // Read app.module.ts
    const appModuleContent = tree.read(appModulePath)?.toString('utf-8');
    if (!appModuleContent) {
      throw new Error(`Could not read ${appModulePath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const appModuleSource = project.createSourceFile(
      appModulePath,
      appModuleContent,
      { overwrite: true }
    );

    const hydrationCallExpression = findAndRemoveHydrationConfigInAppModule(
      appModuleSource,
      appModulePath,
      tree
    );

    // If we found hydration config, move it to app.config.ts
    if (hydrationCallExpression) {
      addHydrationConfigToAppConfig(
        appConfigPath,
        hydrationCallExpression,
        tree,
        project
      );

      context.logger.info('✅ Moved hydration config to app.config.ts');
    } else {
      context.logger.info(
        'ℹ️ No hydration config found in app.module.ts, skipping'
      );
    }

    return tree;
  };
}

/**
 * Finds and removes provideClientHydration in app.module.ts
 * Returns the removed expression as string, or null if not found
 */
function findAndRemoveHydrationConfigInAppModule(
  appModuleSource: SourceFile,
  appModulePath: string,
  tree: Tree
): string | null {
  const classDeclaration = appModuleSource.getClass('AppModule');
  if (!classDeclaration) {
    return null;
  }

  const decorator = classDeclaration.getDecorator('NgModule');
  if (!decorator) {
    return null;
  }

  const decoratorArgs = decorator.getArguments();
  if (decoratorArgs.length === 0) {
    return null;
  }

  const configObject = decoratorArgs[0];
  if (!configObject.isKind(SyntaxKind.ObjectLiteralExpression)) {
    return null;
  }

  const providersProp = configObject.getProperty('providers');
  if (!providersProp || !providersProp.isKind(SyntaxKind.PropertyAssignment)) {
    return null;
  }

  const initializer = providersProp.getInitializer();
  if (!initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
    return null;
  }

  return findAndRemoveHydrationElement(
    initializer,
    providersProp,
    appModuleSource,
    appModulePath,
    tree
  );
}

function findAndRemoveHydrationElement(
  providersArray: any,
  providersProp: any,
  appModuleSource: SourceFile,
  appModulePath: string,
  tree: Tree
): string | null {
  const hydrationElementIndex = findHydrationElementIndex(providersArray);

  if (hydrationElementIndex === -1) {
    return null;
  }

  const hydrationElement = providersArray.getElements()[hydrationElementIndex];
  const hydrationCallExpression = hydrationElement.getText();

  providersArray.removeElement(hydrationElementIndex);
  removeProvidersPropertyIfEmpty(providersArray, providersProp);

  formatFile(appModuleSource);
  tree.overwrite(appModulePath, appModuleSource.getFullText());

  return hydrationCallExpression;
}

function findHydrationElementIndex(providersArray: any): number {
  return providersArray.getElements().findIndex((element: any) => {
    if (!element.isKind(SyntaxKind.CallExpression)) {
      return false;
    }

    const expression = element.getExpression();
    return (
      expression.isKind(SyntaxKind.Identifier) &&
      expression.getText() === 'provideClientHydration'
    );
  });
}

function removeProvidersPropertyIfEmpty(
  providersArray: any,
  providersProp: any
): void {
  if (providersArray.getElements().length === 0) {
    providersProp.remove();
  }
}

function addHydrationConfigToAppConfig(
  appConfigPath: string,
  hydrationCallExpression: string,
  tree: Tree,
  project: Project
): void {
  const appConfigContent = tree.readText(appConfigPath);
  if (!appConfigContent) {
    throw new Error(`Could not read ${appConfigPath}`);
  }

  const appConfigSource = project.createSourceFile(
    appConfigPath,
    appConfigContent,
    { overwrite: true }
  );

  createImports(appConfigSource, [
    {
      moduleSpecifier: '@angular/platform-browser',
      namedImports: [
        'provideClientHydration',
        'withEventReplay',
        'withNoHttpTransferCache',
      ],
    },
  ]);

  // Add hydration config to app.config.ts providers
  const providersArray = getAppConfigProviders(appConfigSource);
  if (providersArray) {
    // Add at the beginning of the providers array
    providersArray.insertElement(0, hydrationCallExpression);
  }

  formatFile(appConfigSource);
  tree.overwrite(appConfigPath, appConfigSource.getFullText());
}
