/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * List of predefined providers to remove from AppModule.
 * These will be moved to app.config.ts
 */
const PROVIDERS_TO_REMOVE = [
  'provideBrowserGlobalErrorListeners',
  'provideZoneChangeDetection',
  'provideHttpClient',
];

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

    // Remove bootstrap property
    const bootstrapProp = configObject.getProperty('bootstrap');
    if (bootstrapProp) {
      bootstrapProp.remove();
    }

    // Remove declarations property
    const declarationsProp = configObject.getProperty('declarations');
    if (declarationsProp) {
      declarationsProp.remove();
    }

    // Remove predefined providers
    const providersProp = configObject.getProperty('providers');
    if (providersProp && providersProp.isKind(SyntaxKind.PropertyAssignment)) {
      const initializer = providersProp.getInitializer();
      if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
        const elementsToRemove = [];

        for (const element of initializer.getElements()) {
          if (element.isKind(SyntaxKind.CallExpression)) {
            const expression = element.getExpression();
            if (expression.isKind(SyntaxKind.Identifier)) {
              const functionName = expression.getText();
              if (PROVIDERS_TO_REMOVE.includes(functionName)) {
                elementsToRemove.push(element);
              }
            }
          }
        }

        // Remove elements
        elementsToRemove.forEach((el) => {
          const index = initializer.getElements().indexOf(el);
          if (index !== -1) {
            initializer.removeElement(index);
          }
        });

        // If providers array is now empty, remove the property
        if (initializer.getElements().length === 0) {
          providersProp.remove();
        }
      }
    }

    // Remove BrowserModule from imports
    const importsProp = configObject.getProperty('imports');
    if (importsProp && importsProp.isKind(SyntaxKind.PropertyAssignment)) {
      const initializer = importsProp.getInitializer();
      if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
        const elementsToRemove = [];

        for (const element of initializer.getElements()) {
          if (
            element.isKind(SyntaxKind.Identifier) &&
            element.getText() === 'BrowserModule'
          ) {
            elementsToRemove.push(element);
          }
        }

        // Remove elements
        elementsToRemove.forEach((el) => {
          const index = initializer.getElements().indexOf(el);
          if (index !== -1) {
            initializer.removeElement(index);
          }
        });
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

    tree.overwrite(appModulePath, sourceFile.getFullText());

    context.logger.info('✅ Updated app.module.ts');

    return tree;
  };
}
