/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Node, SourceFile } from 'ts-morph';
import { formatFile } from '../shared';

/**
 * Helper function to add a value to a Component decorator property.
 */
export function addToComponentDecorator(
  sourceFile: SourceFile,
  propertyName: string,
  value: string
): void {
  const classes = sourceFile.getClasses();

  for (const classDeclaration of classes) {
    const decorator = classDeclaration.getDecorator('Component');

    if (decorator) {
      const args = decorator.getArguments();

      if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
        const objLiteral = args[0];
        const importsProperty = objLiteral
          .getProperties()
          .find(
            (prop) =>
              Node.isPropertyAssignment(prop) && prop.getName() === propertyName
          );

        if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
          // Replace the entire array with the new value
          importsProperty.setInitializer(`[${value}]`);
        } else {
          // Add the property if it doesn't exist
          objLiteral.addPropertyAssignment({
            name: propertyName,
            initializer: `[${value}]`,
          });
        }
      }
    }
  }
  formatFile(sourceFile);
}
