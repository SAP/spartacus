import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { TSESLint } from '@typescript-eslint/utils';
import {
  fixMissingImplementsInterface,
  hasImplementsInterface,
} from './implements-interface-utils';

describe('implements-interface-utils', () => {
  const rule = ESLintUtils.RuleCreator(() => __filename)({
    name: 'test-rule',
    meta: {
      messages: {
        missingImplementsMyInterface: 'test error action',
      },
      docs: {
        description: 'test description',
      },
      schema: [],
      type: 'problem',
      fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
      return {
        ClassDeclaration(node: TSESTree.ClassDeclaration) {
          const interfaceName = 'MyInterface'; // Example interface name to test
          if (
            // check if interface is implemented using hasImplementsInterface utility
            !hasImplementsInterface(node, interfaceName)
          ) {
            context.report({
              node: node.id ?? node,
              messageId: 'missingImplementsMyInterface',
              fix: (fixer) => {
                // fix using fixMissingImplementsInterface utility
                return fixMissingImplementsInterface({
                  fixer,
                  interfaceName,
                  node,
                  sourceCode: context.sourceCode,
                });
              },
            });
          }
        },
      };
    },
  });

  // Instantiate RuleTester with TypeScript parser
  const ruleTester = new TSESLint.RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  });

  ruleTester.run('hasImplementsInterface', rule, {
    valid: [
      `class MyClass implements MyInterface {}`,
      `class MyClass implements AnotherInterface, MyInterface {}`,
      `class MyClass implements MyInterface, AnotherInterface {}`,
      `class MyClass extends AnotherClass implements MyInterface {}`,
    ],
    invalid: [
      {
        // if there is no superclass, it adds the new interface after the class name
        code: `class MyClass {}`,
        errors: [{ messageId: 'missingImplementsMyInterface' }],
        output: `class MyClass implements MyInterface {}`,
      },
      {
        // if there are already implemented interfaces, it adds the new one at the end
        code: `class MyClass implements AnotherInterface {}`,
        errors: [{ messageId: 'missingImplementsMyInterface' }],
        output: `class MyClass implements AnotherInterface, MyInterface {}`,
      },
      {
        // if there is a superclass, it adds the new interface after it
        code: `class MyClass extends SuperClass {}`,
        errors: [{ messageId: 'missingImplementsMyInterface' }],
        output: `class MyClass extends SuperClass implements MyInterface {}`,
      },
    ],
  });
});
