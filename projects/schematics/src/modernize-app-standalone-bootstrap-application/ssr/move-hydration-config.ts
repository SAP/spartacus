/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';
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

    // Find provideClientHydration in app.module.ts
    let hydrationCallExpression: string | null = null;
    const classDeclaration = appModuleSource.getClass('AppModule');
    if (classDeclaration) {
      const decorator = classDeclaration.getDecorator('NgModule');
      if (decorator) {
        const decoratorArgs = decorator.getArguments();
        if (decoratorArgs.length > 0) {
          const configObject = decoratorArgs[0];
          if (configObject.isKind(SyntaxKind.ObjectLiteralExpression)) {
            const providersProp = configObject.getProperty('providers');
            if (
              providersProp &&
              providersProp.isKind(SyntaxKind.PropertyAssignment)
            ) {
              const initializer = providersProp.getInitializer();
              if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
                // Find the first provideClientHydration call
                const hydrationElementIndex = initializer
                  .getElements()
                  .findIndex((element) => {
                    if (element.isKind(SyntaxKind.CallExpression)) {
                      const expression = element.getExpression();
                      return (
                        expression.isKind(SyntaxKind.Identifier) &&
                        expression.getText() === 'provideClientHydration'
                      );
                    }
                    return false;
                  });

                // If found, capture it and remove it
                if (hydrationElementIndex !== -1) {
                  const hydrationElement =
                    initializer.getElements()[hydrationElementIndex];
                  hydrationCallExpression = hydrationElement.getText();
                  initializer.removeElement(hydrationElementIndex);

                  // If providers array is now empty, remove the property
                  if (initializer.getElements().length === 0) {
                    providersProp.remove();
                  }
                }
              }
            }
          }
        }
      }
    }

    // If we found hydration config, move it to app.config.ts
    if (hydrationCallExpression) {
      formatFile(appModuleSource);
      tree.overwrite(appModulePath, appModuleSource.getFullText());

      // Read app.config.ts
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

      appConfigSource.formatText();
      tree.overwrite(appConfigPath, appConfigSource.getFullText());

      context.logger.info('✅ Moved hydration config to app.config.ts');
    } else {
      context.logger.info(
        'ℹ️ No hydration config found in app.module.ts, skipping'
      );
    }

    return tree;
  };
}
