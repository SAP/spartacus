/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';
import {
  createImports,
  formatFile,
  SPARTACUS_STOREFRONTLIB,
  STOREFRONT_COMPONENT_CLASS,
} from '../../shared';

/**
 * Updates src/app/app.component.ts to be a standalone component:
 * - Removes `standalone: false`
 * - Adds `imports: [StorefrontComponent]`
 * - Adds import for StorefrontComponent from @spartacus/storefront
 */
export function updateAppComponent(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appComponentPath = 'src/app/app.component.ts';

    if (!tree.exists(appComponentPath)) {
      throw new Error(`File ${appComponentPath} not found`);
    }

    context.logger.info('⏳ Updating app.component.ts to standalone...');

    const content = tree.read(appComponentPath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${appComponentPath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(appComponentPath, content, {
      overwrite: true,
    });

    // Add import for StorefrontComponent
    createImports(sourceFile, [
      {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: [STOREFRONT_COMPONENT_CLASS],
      },
    ]);

    // Find the @Component decorator
    const classDeclaration = sourceFile.getClass('AppComponent');
    if (!classDeclaration) {
      throw new Error('Could not find AppComponent class');
    }

    const decorator = classDeclaration.getDecorator('Component');
    if (!decorator) {
      throw new Error('Could not find @Component decorator');
    }

    const decoratorArgs = decorator.getArguments();
    if (decoratorArgs.length === 0) {
      throw new Error('@Component decorator has no arguments');
    }

    const configObject = decoratorArgs[0];
    if (!configObject.isKind(SyntaxKind.ObjectLiteralExpression)) {
      throw new Error('@Component decorator argument is not an object');
    }

    // Remove standalone: false if exists
    const standaloneProp = configObject.getProperty('standalone');
    if (standaloneProp) {
      standaloneProp.remove();
    }

    // Add or update imports property
    const importsProp = configObject.getProperty('imports');
    if (importsProp) {
      // Check if StorefrontComponent already exists
      if (importsProp.isKind(SyntaxKind.PropertyAssignment)) {
        const initializer = importsProp.getInitializer();
        if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
          const elements = initializer.getElements();
          const hasStorefrontComponent = elements.some(
            (el) =>
              el.isKind(SyntaxKind.Identifier) &&
              el.getText() === STOREFRONT_COMPONENT_CLASS
          );
          if (!hasStorefrontComponent) {
            initializer.addElement(STOREFRONT_COMPONENT_CLASS);
          }
        }
      }
    } else {
      // Add imports property
      configObject.addPropertyAssignment({
        name: 'imports',
        initializer: `[${STOREFRONT_COMPONENT_CLASS}]`,
      });
    }

    formatFile(sourceFile);
    tree.overwrite(appComponentPath, sourceFile.getFullText());

    context.logger.info('✅ Updated app.component.ts to standalone');

    return tree;
  };
}
