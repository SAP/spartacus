/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as ts from 'typescript';
import {
  hasPropertyInitialization,
  isAccessModifier,
  isClassPropertyParameter,
  isPropertyAssignment,
  isPropertyInitialized,
} from './typescript-ast-utils';

/**
 * Creates a mock TypeScript Type with specified properties
 * @param isClass - Whether the type represents a class
 * @param symbol - The symbol associated with the type
 * @param properties - List of properties available on the type
 * @param baseTypes - List of base types (for inheritance)
 * @returns A mocked TypeScript Type object
 */
const createMockType = (
  isClass = true,
  symbol?: ts.Symbol,
  properties: ts.Symbol[] = [],
  baseTypes: ts.Type[] = []
): ts.Type =>
  ({
    isClass: () => isClass,
    getSymbol: () => symbol,
    getProperties: () => properties,
    getBaseTypes: () => baseTypes,
  }) as ts.Type;

/**
 * Creates a mock TypeScript Symbol with specified name and declarations
 * @param name - The name of the symbol
 * @param declarations - List of declarations associated with the symbol
 * @returns A mocked TypeScript Symbol object
 */
const createMockSymbol = (
  name: string,
  declarations: ts.Declaration[] = []
): ts.Symbol =>
  ({
    getName: () => name,
    declarations,
  }) as ts.Symbol;

/**
 * Creates a mock TypeScript Node with all required base node properties
 * Used as a base for other node types to ensure they have all required Node properties
 * @returns A mocked TypeScript Node object with default implementations
 */
const createMockNode = () => ({
  getSourceFile: () => undefined as any,
  getChildCount: () => 0,
  getChildAt: () => undefined as any,
  getChildren: () => [],
  getStart: () => 0,
  getFullStart: () => 0,
  getEnd: () => 0,
  getWidth: () => 0,
  getFullWidth: () => 0,
  getLeadingTriviaWidth: () => 0,
  getFullText: () => '',
  getText: () => '',
  forEachChild: () => undefined as any,
  pos: 0,
  end: 0,
  getFirstToken: () => undefined as any,
  getLastToken: () => undefined as any,
});

/**
 * Creates a mock TypeScript ClassDeclaration with specified members and heritage clauses
 * @param members - List of class members (properties, methods, etc.)
 * @param heritageClauses - List of heritage clauses (extends, implements)
 * @returns A mocked TypeScript ClassDeclaration object
 */
const createMockDeclaration = (
  members: ts.ClassElement[] = [],
  heritageClauses?: ts.HeritageClause[]
): ts.ClassDeclaration =>
  ({
    ...createMockNode(),
    kind: ts.SyntaxKind.ClassDeclaration,
    members,
    heritageClauses,
    flags: 0,
    _declarationBrand: true as const,
    name: ts.factory.createIdentifier('TestClass'),
    parent: undefined as any,
    modifiers: undefined,
    typeParameters: undefined,
    decorators: undefined,
  }) as unknown as ts.ClassDeclaration;

describe('typescript-ast-utils', () => {
  describe('isAccessModifier', () => {
    it('should return true for public keyword', () => {
      const modifier = ts.factory.createModifier(ts.SyntaxKind.PublicKeyword);
      expect(isAccessModifier(modifier)).toBe(true);
    });

    it('should return true for private keyword', () => {
      const modifier = ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword);
      expect(isAccessModifier(modifier)).toBe(true);
    });

    it('should return true for protected keyword', () => {
      const modifier = ts.factory.createModifier(
        ts.SyntaxKind.ProtectedKeyword
      );
      expect(isAccessModifier(modifier)).toBe(true);
    });

    it('should return false for other modifiers', () => {
      const modifier = ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword);
      expect(isAccessModifier(modifier)).toBe(false);
    });
  });

  describe('isClassPropertyParameter', () => {
    it('should return true for parameter with access modifier', () => {
      const param = ts.factory.createParameterDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
        undefined,
        'testParam'
      );
      expect(isClassPropertyParameter(param, 'testParam')).toBe(true);
    });

    it('should return false for parameter without access modifier', () => {
      const param = ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        'testParam'
      );
      expect(isClassPropertyParameter(param, 'testParam')).toBe(false);
    });
  });

  describe('hasPropertyInitialization', () => {
    it('should return true for property with initializer', () => {
      const property = ts.factory.createPropertyDeclaration(
        undefined,
        'testProp',
        undefined,
        undefined,
        ts.factory.createStringLiteral('test')
      );
      expect(hasPropertyInitialization(property, 'testProp')).toBe(true);
    });

    it('should return false for property without initialization', () => {
      const property = ts.factory.createPropertyDeclaration(
        undefined,
        'testProp',
        undefined,
        undefined,
        undefined
      );
      expect(hasPropertyInitialization(property, 'testProp')).toBe(false);
    });
  });

  describe('isPropertyAssignment', () => {
    it('should return true for property assignment', () => {
      const statement = ts.factory.createExpressionStatement(
        ts.factory.createBinaryExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createThis(),
            'testProp'
          ),
          ts.factory.createToken(ts.SyntaxKind.EqualsToken),
          ts.factory.createStringLiteral('test')
        )
      );
      expect(isPropertyAssignment(statement, 'testProp')).toBe(true);
    });

    it('should return false for non-property assignment', () => {
      const statement = ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('test'),
          undefined,
          []
        )
      );
      expect(isPropertyAssignment(statement, 'testProp')).toBe(false);
    });
  });

  describe('isPropertyInitialized', () => {
    it('should return false if type has no symbol', () => {
      const type = createMockType();
      expect(isPropertyInitialized(type, 'testProp')).toBe(false);
    });

    it('should return false if symbol has no declarations', () => {
      const type = createMockType(true, createMockSymbol('TestClass'));
      expect(isPropertyInitialized(type, 'testProp')).toBe(false);
    });

    it('should return true if property has initializer', () => {
      const property = ts.factory.createPropertyDeclaration(
        undefined,
        'testProp',
        undefined,
        undefined,
        ts.factory.createStringLiteral('test')
      );
      const declaration = createMockDeclaration([property]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is initialized in constructor parameter', () => {
      const param = ts.factory.createParameterDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
        undefined,
        'testProp'
      );
      const constructor = ts.factory.createConstructorDeclaration(
        undefined,
        [param],
        ts.factory.createBlock([])
      );
      const declaration = createMockDeclaration([constructor]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is assigned in constructor', () => {
      const assignment = ts.factory.createExpressionStatement(
        ts.factory.createBinaryExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createThis(),
            'testProp'
          ),
          ts.factory.createToken(ts.SyntaxKind.EqualsToken),
          ts.factory.createStringLiteral('test')
        )
      );
      const constructor = ts.factory.createConstructorDeclaration(
        undefined,
        [],
        ts.factory.createBlock([assignment])
      );
      const declaration = createMockDeclaration([constructor]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is initialized in parent class', () => {
      const property = ts.factory.createPropertyDeclaration(
        undefined,
        'testProp',
        undefined,
        undefined,
        ts.factory.createStringLiteral('test')
      );
      const declaration = createMockDeclaration([]);
      const parentDeclaration = createMockDeclaration([property]);
      const parentType = createMockType(
        true,
        createMockSymbol('ParentClass', [parentDeclaration])
      );
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration]),
        [],
        [parentType]
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is initialized in any constructor (multiple constructors)', () => {
      const deprecatedConstructor = ts.factory.createConstructorDeclaration(
        undefined,
        [
          ts.factory.createParameterDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'testProp'
          ),
        ],
        ts.factory.createBlock([])
      );
      const newConstructor = ts.factory.createConstructorDeclaration(
        undefined,
        [],
        ts.factory.createBlock([])
      );
      const declaration = createMockDeclaration([
        deprecatedConstructor,
        newConstructor,
      ]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is initialized in any parent class (multiple inheritance)', () => {
      const property = ts.factory.createPropertyDeclaration(
        undefined,
        'testProp',
        undefined,
        undefined,
        ts.factory.createStringLiteral('test')
      );
      const declaration = createMockDeclaration([]);
      const parentDeclaration1 = createMockDeclaration([]);
      const parentType1 = createMockType(
        true,
        createMockSymbol('ParentClass1', [parentDeclaration1])
      );
      const parentDeclaration2 = createMockDeclaration([property]);
      const parentType2 = createMockType(
        true,
        createMockSymbol('ParentClass2', [parentDeclaration2])
      );
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration]),
        [],
        [parentType1, parentType2]
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is initialized via optional constructor parameter', () => {
      const param = ts.factory.createParameterDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
        undefined,
        'testProp',
        ts.factory.createToken(ts.SyntaxKind.QuestionToken)
      );
      const constructor = ts.factory.createConstructorDeclaration(
        undefined,
        [param],
        ts.factory.createBlock([])
      );
      const declaration = createMockDeclaration([constructor]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });

    it('should return true if property is assigned via constructor parameter in body', () => {
      const param = ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        'param'
      );
      const assignment = ts.factory.createExpressionStatement(
        ts.factory.createBinaryExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createThis(),
            'testProp'
          ),
          ts.factory.createToken(ts.SyntaxKind.EqualsToken),
          ts.factory.createIdentifier('param')
        )
      );
      const constructor = ts.factory.createConstructorDeclaration(
        undefined,
        [param],
        ts.factory.createBlock([assignment])
      );
      const declaration = createMockDeclaration([constructor]);
      const type = createMockType(
        true,
        createMockSymbol('TestClass', [declaration])
      );

      expect(isPropertyInitialized(type, 'testProp')).toBe(true);
    });
  });
});
