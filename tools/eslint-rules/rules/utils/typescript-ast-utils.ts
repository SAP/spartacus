/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import ts from 'typescript';

/**
 * Checks if a modifier is an access modifier (public, private, protected)
 * @param modifier - The modifier to check
 * @returns True if the modifier is an access modifier
 */
export function isAccessModifier(modifier: ts.ModifierLike): boolean {
  const accessModifiers = [
    ts.SyntaxKind.PublicKeyword,
    ts.SyntaxKind.PrivateKeyword,
    ts.SyntaxKind.ProtectedKeyword,
  ];
  return accessModifiers.includes(modifier.kind);
}

/**
 * Checks if a given parameter is a class property parameter
 * @param param - The parameter node to check
 * @param propertyName - The name of the property to check for
 * @returns True if the parameter is a class property with the specified name
 */
export function isInitializedConstructorParameter(
  param: ts.ParameterDeclaration,
  propertyName: string
): boolean {
  if (!ts.isParameter(param)) {
    return false;
  }
  if (!param.modifiers?.some(isAccessModifier)) {
    return false;
  }

  if (!ts.isIdentifier(param.name)) {
    return false;
  }

  return param.name.text === propertyName;
}

/**
 * Checks if a property declaration has an initializer
 * @param member - The class member to check
 * @param propertyName - The name of the property to check for
 * @returns True if the property is initialized
 */
export function hasPropertyInitialization(
  member: ts.ClassElement,
  propertyName: string
): boolean {
  if (!ts.isPropertyDeclaration(member)) {
    return false;
  }

  if (!ts.isIdentifier(member.name)) {
    return false;
  }

  if (member.name.text !== propertyName) {
    return false;
  }

  return !!member.initializer;
}

/**
 * Checks if a statement is a property assignment
 * @param statement - The statement to check
 * @param propertyName - The name of the property to check for
 * @returns True if the statement assigns to the specified property
 */
export function isPropertyAssignment(
  statement: ts.Statement,
  propertyName: string
): boolean {
  if (!ts.isExpressionStatement(statement)) {
    return false;
  }

  const expression = statement.expression;
  if (!ts.isBinaryExpression(expression)) {
    return false;
  }

  if (expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken) {
    return false;
  }

  if (!ts.isPropertyAccessExpression(expression.left)) {
    return false;
  }

  if (!ts.isIdentifier(expression.left.name)) {
    return false;
  }

  return expression.left.name.text === propertyName;
}

/**
 * Checks if a property has been initialized in the class or its parent classes.
 * A property is considered initialized if any of these conditions are met:
 * - It has an initializer in its declaration (e.g. `prop = value`)
 * - It is declared as a parameter property in the constructor (e.g. `constructor(private prop: type)`)
 * - It is explicitly assigned in the constructor body (e.g. `this.prop = value`)
 * - It is initialized in any parent class through any of the above methods
 * @param classType - The TypeScript type representing the class
 * @param propertyName - The name of the property to check
 * @returns True if the property is definitely initialized
 */
export function isPropertyInitialized(
  classType: ts.Type,
  propertyName: string
): boolean {
  const symbol = classType.getSymbol();

  // Return false if the symbol or its first declaration is not defined
  if (!symbol?.declarations?.[0]) {
    return false;
  }
  const declaration = symbol.declarations[0];
  if (ts.isClassDeclaration(declaration)) {
    // Check for property declaration with initializer
    if (
      declaration.members.some((member) =>
        hasPropertyInitialization(member, propertyName)
      )
    ) {
      return true;
    }

    // Find constructor that either has no parameters or has parameter properties
    const constructors = declaration.members.filter(
      ts.isConstructorDeclaration
    );

    for (const constructor of constructors) {
      if (constructor) {
        // Check constructor parameters for parameter properties
        if (
          constructor.parameters.some((param) =>
            isInitializedConstructorParameter(param, propertyName)
          )
        ) {
          return true;
        }

        // Check constructor body for assignments
        if (
          constructor.body?.statements.some((statement) =>
            isPropertyAssignment(statement, propertyName)
          )
        ) {
          return true;
        }
      }
    }
  }
  // Check parent class if property is not initialized in the current class
  const baseTypes = classType.getBaseTypes();
  if (!baseTypes) {
    return false;
  }

  return baseTypes.some((baseType) =>
    isPropertyInitialized(baseType, propertyName)
  );
}
