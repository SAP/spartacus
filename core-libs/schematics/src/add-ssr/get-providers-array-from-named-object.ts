/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArrayLiteralExpression,
  Node,
  ObjectLiteralExpression,
  SourceFile,
} from 'ts-morph';

/**
 * Helper function to get the providers array from a variable declaration
 * in a TypeScript source file.
 *
 * @param sourceFile The source file to search in
 * @param variableName The name of the variable to find (e.g., 'appConfig', 'serverConfig')
 * @returns The providers array node if found, undefined otherwise
 */
export function getProvidersFromNamedObject(
  sourceFile: SourceFile,
  variableName: string
): ArrayLiteralExpression | undefined {
  const variableStatements = sourceFile.getVariableStatements();

  for (const statement of variableStatements) {
    const declarations = statement.getDeclarations();

    for (const declaration of declarations) {
      if (declaration.getName() !== variableName) {
        continue;
      }

      const initializer = declaration.getInitializer();
      if (initializer && Node.isObjectLiteralExpression(initializer)) {
        return extractProvidersArray(initializer);
      }
    }
  }

  return undefined;
}

/**
 * Extracts the providers array from an object literal expression.
 */
function extractProvidersArray(
  initializer: ObjectLiteralExpression
): ArrayLiteralExpression | undefined {
  const providersProperty = initializer.getProperty('providers');

  if (!providersProperty || !Node.isPropertyAssignment(providersProperty)) {
    return undefined;
  }

  const providersArray = providersProperty.getInitializer();
  if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
    return providersArray;
  }

  return undefined;
}
