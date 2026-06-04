/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ArrayLiteralExpression,
  ObjectLiteralExpression,
  Project,
  SourceFile,
  SyntaxKind,
} from 'ts-morph';
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

    createImports(sourceFile, [
      {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: [STOREFRONT_COMPONENT_CLASS],
      },
    ]);

    const configObject = getComponentDecoratorConfig(sourceFile);
    removeStandaloneProperty(configObject);
    addOrUpdateImportsProperty(configObject);

    formatFile(sourceFile);
    tree.overwrite(appComponentPath, sourceFile.getFullText());

    context.logger.info('✅ Updated app.component.ts to standalone');

    return tree;
  };
}

function getComponentDecoratorConfig(
  sourceFile: SourceFile
): ObjectLiteralExpression {
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

  return configObject;
}

function removeStandaloneProperty(configObject: ObjectLiteralExpression): void {
  const standaloneProp = configObject.getProperty('standalone');
  if (standaloneProp) {
    standaloneProp.remove();
  }
}

function addOrUpdateImportsProperty(
  configObject: ObjectLiteralExpression
): void {
  const importsProp = configObject.getProperty('imports');

  if (!importsProp) {
    configObject.addPropertyAssignment({
      name: 'imports',
      initializer: `[${STOREFRONT_COMPONENT_CLASS}]`,
    });
    return;
  }

  if (!importsProp.isKind(SyntaxKind.PropertyAssignment)) {
    return;
  }

  const initializer = importsProp.getInitializer();
  if (!initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
    return;
  }

  addElementIfMissing(initializer);
}

function addElementIfMissing(initializer: ArrayLiteralExpression): void {
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
