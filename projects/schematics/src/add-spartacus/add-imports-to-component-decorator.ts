/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Node,
  ObjectLiteralExpression,
  PropertyAssignment,
  SourceFile,
} from 'ts-morph';
import { formatFile } from '../shared';

/**
 * Helper function to add imports to a Component decorator.
 */
export function addImportsToComponentDecorator(
  sourceFile: SourceFile,
  value: string,
  options: { removeOldImports?: boolean } = {}
): void {
  const { removeOldImports = true } = options;
  const classes = sourceFile.getClasses();

  for (const classDeclaration of classes) {
    const decorator = classDeclaration.getDecorator('Component');
    if (!decorator) {
      continue;
    }

    const args = decorator.getArguments();
    if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
      processComponentDecorator(args[0], value, { removeOldImports });
    }
  }
  formatFile(sourceFile);
}

/**
 * Processes the Component decorator's object literal to add imports.
 */
function processComponentDecorator(
  objLiteral: ObjectLiteralExpression,
  value: string,
  options: { removeOldImports?: boolean }
): void {
  const propertyName = 'imports';
  const importsProperty = objLiteral
    .getProperties()
    .find(
      (prop) =>
        Node.isPropertyAssignment(prop) && prop.getName() === propertyName
    );

  if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
    updateImportsProperty(importsProperty, value, options);
  } else {
    objLiteral.addPropertyAssignment({
      name: propertyName,
      initializer: `[${value}]`,
    });
  }
}

/**
 * Updates an existing imports property with the new value.
 */
function updateImportsProperty(
  importsProperty: PropertyAssignment,
  value: string,
  options: { removeOldImports?: boolean }
): void {
  if (options.removeOldImports) {
    importsProperty.setInitializer(`[${value}]`);
    return;
  }

  const currentInitializer = importsProperty.getInitializer();
  if (currentInitializer && Node.isArrayLiteralExpression(currentInitializer)) {
    const existingElements = currentInitializer
      .getElements()
      .map((el) => el.getText());
    const newImports = [...existingElements, value];
    importsProperty.setInitializer(`[${newImports.join(', ')}]`);
  } else {
    importsProperty.setInitializer(`[${value}]`);
  }
}
