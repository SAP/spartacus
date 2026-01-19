/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Node, SourceFile } from 'ts-morph';

/**
 * Helper function to get the providers array from app.config.ts
 */
export function getAppConfigProviders(
  sourceFile: SourceFile
): Node | undefined {
  const variableStatements = sourceFile.getVariableStatements();

  for (const statement of variableStatements) {
    const declarations = statement.getDeclarations();

    for (const declaration of declarations) {
      if (declaration.getName() === 'appConfig') {
        const initializer = declaration.getInitializer();

        if (initializer && Node.isObjectLiteralExpression(initializer)) {
          const providersProperty = initializer.getProperty('providers');

          if (
            providersProperty &&
            Node.isPropertyAssignment(providersProperty)
          ) {
            const providersArray = providersProperty.getInitializer();

            if (
              providersArray &&
              Node.isArrayLiteralExpression(providersArray)
            ) {
              return providersArray;
            }
          }
        }
      }
    }
  }

  return undefined;
}
