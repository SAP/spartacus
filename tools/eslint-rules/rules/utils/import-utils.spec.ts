import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { TSESLint } from '@typescript-eslint/utils';
import { fixPossiblyMissingImport, isIdentifierImported } from './import-utils';

describe('import-utils', () => {
  const rule = ESLintUtils.RuleCreator(() => __filename)({
    name: 'test-rule',
    meta: {
      messages: {
        missingIdentifierImport: 'test error action',
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
          const superClassName = 'MySuperClass'; // Example super class name to test
          if (
            // check if super class is imported using isIdentifierImported utility
            !isIdentifierImported({
              importedIdentifier: superClassName,
              importPath: 'my-superclass',
              sourceCode: context.sourceCode,
            })
          ) {
            context.report({
              node: node.id ?? node,
              messageId: 'missingIdentifierImport',
              fix: (fixer) => {
                // fix using fixPossiblyMissingImport utility
                return fixPossiblyMissingImport({
                  fixer,
                  importedIdentifier: superClassName,
                  importPath: 'my-superclass',
                  sourceCode: context.sourceCode,
                });
              },
            });
          }
        },
      };
    },
  });

  const ruleTester = new TSESLint.RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  });

  ruleTester.run('isIdentifierImported', rule, {
    valid: [
      // This class does not implement 'MyInterface', so it's considered valid under our rule
      `import { MySuperClass } from 'my-superclass';
      
      class MyClass extends MySuperClass {}
      `,
    ],
    invalid: [
      {
        // adds missing import
        code: `
        class MyClass extends MySuperClass {}
        `,
        errors: [{ messageId: 'missingIdentifierImport' }],
        output: `
        import { MySuperClass } from 'my-superclass';
class MyClass extends MySuperClass {}
        `,
      },
      {
        // adds missing import as last import
        code: `
        import { MyInterface } from 'my-interface';
        class MyClass extends MySuperClass implements MyInterface {}
        `,
        errors: [{ messageId: 'missingIdentifierImport' }],
        output: `
        import { MyInterface } from 'my-interface';
import { MySuperClass } from 'my-superclass';

        class MyClass extends MySuperClass implements MyInterface {}
        `,
      },
    ],
  });
});
