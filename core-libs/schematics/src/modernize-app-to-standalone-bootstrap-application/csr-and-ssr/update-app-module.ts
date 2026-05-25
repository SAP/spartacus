/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ObjectLiteralExpression,
  Project,
  SourceFile,
  SyntaxKind,
} from 'ts-morph';
import { formatFile } from '../../shared';

/**
 * Updates src/app/app.module.ts:
 * - Removes `bootstrap: [AppComponent]`
 * - Removes `declarations: [AppComponent]`
 * - Removes predefined providers (provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideHttpClient)
 * - Removes BrowserModule from imports
 */
export function updateAppModule(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModulePath = 'src/app/app.module.ts';

    if (!tree.exists(appModulePath)) {
      throw new Error(`File ${appModulePath} not found`);
    }

    context.logger.info('⏳ Updating app.module.ts...');

    const content = tree.read(appModulePath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${appModulePath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(appModulePath, content, {
      overwrite: true,
    });

    // Find the @NgModule decorator
    const classDeclaration = sourceFile.getClass('AppModule');
    if (!classDeclaration) {
      throw new Error('Could not find AppModule class');
    }

    const decorator = classDeclaration.getDecorator('NgModule');
    if (!decorator) {
      throw new Error('Could not find @NgModule decorator');
    }

    const decoratorArgs = decorator.getArguments();
    if (decoratorArgs.length === 0) {
      throw new Error('@NgModule decorator has no arguments');
    }

    const configObject = decoratorArgs[0];
    if (!configObject.isKind(SyntaxKind.ObjectLiteralExpression)) {
      throw new Error('@NgModule decorator argument is not an object');
    }

    removeBootstrapArray(configObject);
    removeDeclarationsArray(configObject);
    removePredefinedProviders(configObject);
    removeBrowserModule(configObject, sourceFile);

    formatFile(sourceFile);
    tree.overwrite(appModulePath, sourceFile.getFullText());

    context.logger.info('✅ Updated app.module.ts');

    return tree;
  };
}

function removeBootstrapArray(configObject: ObjectLiteralExpression): void {
  const bootstrapProp = configObject.getProperty('bootstrap');
  if (bootstrapProp) {
    bootstrapProp.remove();
  }
}

function removeDeclarationsArray(configObject: ObjectLiteralExpression): void {
  const declarationsProp = configObject.getProperty('declarations');
  if (declarationsProp) {
    declarationsProp.remove();
  }
}

function removePredefinedProviders(
  configObject: ObjectLiteralExpression
): void {
  const PROVIDERS_TO_REMOVE = [
    'provideBrowserGlobalErrorListeners',
    'provideZoneChangeDetection',
    'provideHttpClient',
  ];

  const providersProp = configObject.getProperty('providers');
  if (!providersProp || !providersProp.isKind(SyntaxKind.PropertyAssignment)) {
    return;
  }

  const initializer = providersProp.getInitializer();
  if (!initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
    return;
  }

  // Iterate backwards to avoid index shifting when removing elements
  const elements = initializer.getElements();
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    if (!element.isKind(SyntaxKind.CallExpression)) {
      continue;
    }

    const expression = element.getExpression();
    if (!expression.isKind(SyntaxKind.Identifier)) {
      continue;
    }

    const functionName = expression.getText();
    if (PROVIDERS_TO_REMOVE.includes(functionName)) {
      initializer.removeElement(i);
    }
  }

  // If providers array is now empty, remove the property
  if (initializer.getElements().length === 0) {
    providersProp.remove();
  }
}

function removeBrowserModule(
  configObject: ObjectLiteralExpression,
  sourceFile: SourceFile
): void {
  const importsProp = configObject.getProperty('imports');
  if (importsProp && importsProp.isKind(SyntaxKind.PropertyAssignment)) {
    const initializer = importsProp.getInitializer();
    if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      // Iterate backwards to avoid index shifting when removing elements
      const elements = initializer.getElements();
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (
          element.isKind(SyntaxKind.Identifier) &&
          element.getText() === 'BrowserModule'
        ) {
          initializer.removeElement(i);
        }
      }
    }
  }

  // Remove BrowserModule import if no longer used
  const browserModuleImport = sourceFile.getImportDeclaration(
    '@angular/platform-browser'
  );
  if (browserModuleImport) {
    const namedImports = browserModuleImport.getNamedImports();
    const browserModuleNamedImport = namedImports.find(
      (ni) => ni.getName() === 'BrowserModule'
    );
    if (browserModuleNamedImport) {
      browserModuleNamedImport.remove();
      // If no more named imports, remove the entire import declaration
      if (browserModuleImport.getNamedImports().length === 0) {
        browserModuleImport.remove();
      }
    }
  }
}
