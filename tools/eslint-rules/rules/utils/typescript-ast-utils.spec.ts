import { RuleTester } from '@angular-eslint/test-utils';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { join } from 'path';
import ts from 'typescript';
import {
  hasPropertyInitialization,
  isAccessModifier,
  isInitializedConstructorParameter,
  isPropertyAssignment,
  isPropertyInitialized,
} from './typescript-ast-utils';

const filename = 'file.ts';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: '../../tsconfig.spec.json',
      tsconfigRootDir: join(__dirname, '../fixtures'),
    },
  },
});

const isAccessModifierRule = ESLintUtils.RuleCreator(() => __filename)({
  name: 'test-typescript-utils',
  meta: {
    messages: {
      invalidAccessModifier: 'Invalid access modifier found',
    },
    docs: {
      description:
        'Test rule for typescript-ast-utils isAccessModifier function',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    if (!services || !services.program) {
      return {};
    }

    return {
      PropertyDefinition(node: TSESTree.PropertyDefinition) {
        if (node.accessibility) {
          const tsNode = services.esTreeNodeToTSNodeMap.get(node);
          const modifiers = ts.getModifiers(tsNode);
          const accessModifier = modifiers?.find(
            (mod) =>
              mod.kind === ts.SyntaxKind.PublicKeyword ||
              mod.kind === ts.SyntaxKind.PrivateKeyword ||
              mod.kind === ts.SyntaxKind.ProtectedKeyword
          );

          if (accessModifier && !isAccessModifier(accessModifier)) {
            context.report({
              node,
              messageId: 'invalidAccessModifier',
            });
          }
        }
      },
    };
  },
});

ruleTester.run('isAccessModifier tests', isAccessModifierRule, {
  valid: [
    {
      name: 'should allow public property',
      code: `
          class TestClass {
            public testProperty = '';
          }
        `,
      filename,
    },
    {
      name: 'should allow private property',
      code: `
          class TestClass {
            private testProperty = '';
          }
        `,
      filename,
    },
    {
      name: 'should allow protected property',
      code: `
          class TestClass {
            protected testProperty = '';
          }
        `,
      filename,
    },
    {
      name: 'should allow property without access modifier',
      code: `
          class TestClass {
            testProperty = '';
          }
        `,
      filename,
    },
  ],
  invalid: [],
});

const hasPropertyInitializationRule = ESLintUtils.RuleCreator(() => __filename)(
  {
    name: 'test-property-initialization',
    meta: {
      messages: {
        noInitialized: 'Property {{ propertyName }} has no initializer',
      },
      docs: {
        description:
          'Test rule for typescript-ast-utils hasPropertyInitialization function',
      },
      schema: [],
      type: 'problem',
    },
    defaultOptions: [],
    create(context) {
      const services = ESLintUtils.getParserServices(context);
      if (!services || !services.program) {
        return {};
      }

      return {
        PropertyDefinition(node: TSESTree.PropertyDefinition) {
          if (node.key.type !== 'Identifier') return;

          const tsNode = services.esTreeNodeToTSNodeMap.get(node);
          const propertyName = node.key.name;

          if (!hasPropertyInitialization(tsNode, propertyName)) {
            context.report({
              node: node.key,
              messageId: 'noInitialized',
              data: { propertyName },
            });
          }
        },
      };
    },
  }
);

ruleTester.run(
  'hasPropertyInitialization tests',
  hasPropertyInitializationRule,
  {
    valid: [
      {
        name: 'should detect direct property initialization with string value',
        code: `
          class TestClass {
            testProperty = 'initialized';
          }
        `,
        filename,
      },
      {
        name: 'should detect initialization with different primitive and object types',
        code: `
          class TestClass {
            numberProp = 42;
            booleanProp = true;
            objectProp = { key: 'value' };
            arrayProp = [1, 2, 3];
          }
        `,
        filename,
      },
      {
        name: 'should detect initialization with computed values and template literals',
        code: `
          class TestClass {
            computedProp = 40 + 2;
            templateProp = \`template\${value}\`;
          }
        `,
        filename,
      },
      {
        name: 'should detect initialization with function calls and method references',
        code: `
          class TestClass {
            functionProp = someFunction();
            methodProp = this.someMethod();
          }
        `,
        filename,
      },
    ],
    invalid: [
      {
        name: 'should report property without initialization',
        code: `
          class TestClass {
            testProperty: string;
          }
        `,
        errors: [
          {
            messageId: 'noInitialized',
            data: { propertyName: 'testProperty' },
          },
        ],
        filename,
      },
      {
        name: 'should report multiple properties without initialization',
        code: `
          class TestClass {
            prop1: string;
            prop2: number;
            prop3: boolean;
          }
        `,
        errors: [
          { messageId: 'noInitialized', data: { propertyName: 'prop1' } },
          { messageId: 'noInitialized', data: { propertyName: 'prop2' } },
          { messageId: 'noInitialized', data: { propertyName: 'prop3' } },
        ],
        filename,
      },
      {
        name: 'should report only uninitialized properties in mixed initialization',
        code: `
          class TestClass {
            initialized = true;
            uninitialized: string;
            alsoInitialized = 42;
            alsoUninitialized: number;
          }
        `,
        errors: [
          {
            messageId: 'noInitialized',
            data: { propertyName: 'uninitialized' },
          },
          {
            messageId: 'noInitialized',
            data: { propertyName: 'alsoUninitialized' },
          },
        ],
        filename,
      },
    ],
  }
);

const isPropertyAssignmentRule = ESLintUtils.RuleCreator(() => __filename)({
  name: 'test-property-assignment',
  meta: {
    messages: {
      notAssigned:
        'Property {{ propertyName }} is not assigned in this statement',
    },
    docs: {
      description:
        'Test rule for typescript-ast-utils isPropertyAssignment function',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    if (!services || !services.program) {
      return {};
    }

    return {
      ExpressionStatement(node: TSESTree.ExpressionStatement) {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node);
        const propertyName = 'testProperty';

        if (!isPropertyAssignment(tsNode, propertyName)) {
          context.report({
            node,
            messageId: 'notAssigned',
            data: { propertyName },
          });
        }
      },
    };
  },
});

ruleTester.run('isPropertyAssignment tests', isPropertyAssignmentRule, {
  valid: [
    {
      name: 'should detect direct property assignment in constructor',
      code: `
          class TestClass {
            testProperty: string;
            constructor() {
              this.testProperty = 'value';
            }
          }
        `,
      filename,
    },
  ],
  invalid: [
    {
      name: 'should report property reference without assignment',
      code: `
          class TestClass {
            testProperty: string;
            constructor() {
              this.testProperty;
            }
          }
        `,
      errors: [
        { messageId: 'notAssigned', data: { propertyName: 'testProperty' } },
      ],
      filename,
    },
    {
      name: 'should report compound assignment operators',
      code: `
          class TestClass {
            testProperty: string;
            constructor() {
              this.testProperty += 'value';
            }
          }
        `,
      errors: [
        { messageId: 'notAssigned', data: { propertyName: 'testProperty' } },
      ],
      filename,
    },
    {
      name: 'should report when different property is assigned',
      code: `
          class TestClass {
            testProperty: string;
            otherProperty: string;
            constructor() {
              this.otherProperty = 'value';
            }
          }
        `,
      errors: [
        { messageId: 'notAssigned', data: { propertyName: 'testProperty' } },
      ],
      filename,
    },
  ],
});

const isPropertyInitializedRule = ESLintUtils.RuleCreator(() => __filename)({
  name: 'test-property-initialized',
  meta: {
    messages: {
      notInitialized: 'Property {{ propertyName }} is not initialized',
    },
    docs: {
      description:
        'Test rule for typescript-ast-utils isPropertyInitialized function',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    if (!services || !services.program) {
      return {};
    }

    return {
      ClassDeclaration(node: TSESTree.ClassDeclaration) {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node);
        const type = services.program
          .getTypeChecker()
          .getTypeAtLocation(tsNode);
        const propertyName = 'testProperty';

        if (!isPropertyInitialized(type, propertyName)) {
          context.report({
            node,
            messageId: 'notInitialized',
            data: { propertyName },
          });
        }
      },
    };
  },
});

ruleTester.run('isPropertyInitialized tests', isPropertyInitializedRule, {
  valid: [
    {
      name: 'should detect property initialization in class declaration',
      code: `
          class TestClass {
            testProperty = 'initialized';
          }
        `,
      filename,
    },
    {
      name: 'should detect property initialization in constructor parameter',
      code: `
          class TestClass {
            constructor(public testProperty: string) {}
          }
        `,
      filename,
    },
    {
      name: 'should detect property initialization in constructor body',
      code: `
          class TestClass {
            testProperty: string;
            constructor() {
              this.testProperty = 'initialized';
            }
          }
        `,
      filename,
    },
    {
      name: 'should detect property initialization in parent class declaration',
      code: `
          class BaseClass {
            testProperty = 'initialized';
          }
          class TestClass extends BaseClass {}
        `,
      filename,
    },
    {
      name: 'should detect property initialization in parent class constructor parameter',
      code: `
          class BaseClass {
            constructor(public testProperty: string) {}
          }
          class TestClass extends BaseClass {}
        `,
      filename,
    },
    {
      name: 'should detect property initialization in parent class constructor body',
      code: `
          class BaseClass {
            testProperty: string;
            constructor() {
              this.testProperty = 'initialized';
            }
          }
          class TestClass extends BaseClass {}
        `,
      filename,
    },
    {
      name: 'should detect property initialization through deep inheritance chain',
      code: `
          class GrandParentClass {
            testProperty = 'initialized';
          }
          class ParentClass extends GrandParentClass {}
          class TestClass extends ParentClass {}
        `,
      filename,
    },
  ],
  invalid: [
    {
      name: 'should report uninitialized property in class',
      code: `
          class TestClass {
            testProperty: string;
          }
        `,
      errors: [
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
      ],
      filename,
    },
    {
      name: 'should report uninitialized property in parent class',
      code: `
          class BaseClass {
            testProperty: string;
          }
          class TestClass extends BaseClass {}
        `,
      errors: [
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
      ],
      filename,
    },
    {
      name: 'should report uninitialized property through deep inheritance chain',
      code: `
          class GrandParentClass {
            testProperty: string;
          }
          class ParentClass extends GrandParentClass {}
          class TestClass extends ParentClass {}
        `,
      errors: [
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
      ],
      filename,
    },
    {
      name: 'should report uninitialized property even with initialized sibling class',
      code: `
          class BaseClass {
            testProperty: string;
          }
          class SiblingClass {
            testProperty = 'initialized';
          }
          class TestClass extends BaseClass {}
        `,
      errors: [
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
      ],
      filename,
    },
    {
      name: 'should report uninitialized property in base class even with initialized child class',
      code: `
          class BaseClass {
            testProperty: string;
          }
          class TestClass extends BaseClass {
            testProperty = 'initialized';
          }
        `,
      errors: [
        {
          messageId: 'notInitialized',
          data: { propertyName: 'testProperty' },
        },
      ],
      filename,
    },
  ],
});

const isInitializedConstructorParameterRule = ESLintUtils.RuleCreator(
  () => __filename
)({
  name: 'test-class-property-parameter',
  meta: {
    messages: {
      notInitializedConstructorParameter:
        'Parameter is not initialized in constructor',
    },
    docs: {
      description:
        'Test rule for typescript-ast-utils isInitializedConstructorParameter function',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    if (!services || !services.program) {
      return {};
    }

    return {
      'MethodDefinition[kind="constructor"]'(node: TSESTree.Parameter) {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node);

        if (!ts.isConstructorDeclaration(tsNode)) return;
        // Only report if it's not a class property parameter
        const hasInitializerInConstructor = tsNode.parameters.some((param) =>
          isInitializedConstructorParameter(param, 'testProperty')
        );

        if (!hasInitializerInConstructor) {
          context.report({
            node,
            messageId: 'notInitializedConstructorParameter',
          });
        }
      },
    };
  },
});

ruleTester.run(
  'isInitializedConstructorParameter tests',
  isInitializedConstructorParameterRule,
  {
    valid: [
      {
        name: 'should allow public parameter property',
        code: `
          class TestClass {
            constructor(public testProperty: string) {}
          }
        `,
        filename,
      },
      {
        name: 'should allow private parameter property',
        code: `
          class TestClass {
            constructor(private testProperty: string) {}
          }
        `,
        filename,
      },
      {
        name: 'should allow protected parameter property',
        code: `
          class TestClass {
            constructor(protected testProperty: string) {}
          }
        `,
        filename,
      },
      {
        name: 'should allow readonly parameter property',
        code: `
          class TestClass {
            constructor(public readonly testProperty: string) {}
          }
        `,
        filename,
      },
      {
        name: 'should allow multiple parameter properties',
        code: `
          class TestClass {
            constructor(
              public prop1: string,
              private testProperty: number,
              protected prop3: boolean
            ) {}
          }
        `,
        filename,
      },
    ],
    invalid: [
      {
        name: 'should not allow regular parameter (not a property)',
        code: `
          class TestClass {
            constructor(testProperty: string) {}
          }
        `,
        errors: [
          {
            messageId: 'notInitializedConstructorParameter',
            data: { paramName: 'testProperty' },
          },
        ],
        filename,
      },
      {
        name: 'should not allow mixed parameters',
        code: `
          class TestClass {
            constructor(
              public prop1: string,
              regularParam: number,
              protected prop3: boolean
            ) {}
          }
        `,
        errors: [
          {
            messageId: 'notInitializedConstructorParameter',
          },
        ],
        filename,
      },
    ],
  }
);
