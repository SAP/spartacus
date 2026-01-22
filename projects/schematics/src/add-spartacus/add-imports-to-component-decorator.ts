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

    if (decorator) {
      const args = decorator.getArguments();

      if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
        updateComponentImports(args[0], value, removeOldImports);
      }
    }
  }
  formatFile(sourceFile);
}

/**
 * Updates or adds imports property to the Component decorator
 */
function updateComponentImports(
  objLiteral: ObjectLiteralExpression,
  value: string,
  removeOldImports: boolean
): void {
  const propertyName = 'imports';
  const importsProperty = objLiteral
    .getProperties()
    .find(
      (prop) =>
        Node.isPropertyAssignment(prop) && prop.getName() === propertyName
    );

  if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
    if (removeOldImports) {
      replaceImportsProperty(importsProperty, value);
    } else {
      appendToImportsProperty(importsProperty, value);
    }
  } else {
    // Add the property if it doesn't exist
    objLiteral.addPropertyAssignment({
      name: propertyName,
      initializer: `[${value}]`,
    });
  }
}

/**
 * Updates the imports property by replacing with new value
 */
function replaceImportsProperty(
  importsProperty: PropertyAssignment,
  value: string
): void {
  importsProperty.setInitializer(`[${value}]`);
}

/**
 * Updates the imports property by appending new value to existing imports
 */
function appendToImportsProperty(
  importsProperty: PropertyAssignment,
  value: string
): void {
  const currentInitializer = importsProperty.getInitializer();
  if (currentInitializer && Node.isArrayLiteralExpression(currentInitializer)) {
    const existingElements = currentInitializer
      .getElements()
      .map((el) => el.getText());
    const newImports = [...existingElements, value];
    importsProperty.setInitializer(`[${newImports.join(', ')}]`);
  } else {
    // Fallback to replacement if not an array
    importsProperty.setInitializer(`[${value}]`);
  }
}
