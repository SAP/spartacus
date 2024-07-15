// Import necessary modules from ESLint and TypeScript ESLint
import { TSESTree } from '@typescript-eslint/utils';

import { TSESLint } from '@typescript-eslint/utils';
import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { hasImplementsInterface } from './implements-interface-utils';

describe('hasImplementsInterface', () => {
  // Create a mock rule using hasImplementsInterface function
  const rule = {
    meta: {
      messages: {
        missingImplementsErrorAction: 'test error action',
      },
    },
    create(context: any) {
      return {
        ClassDeclaration(node: TSESTree.ClassDeclaration) {
          const interfaceName = 'MyInterface'; // Example interface name to test
          if (!hasImplementsInterface(node, interfaceName)) {
            // console.log(
            //   'Node:',
            //   JSON.stringify(
            //     node,
            //     (key, value) => {
            //       if (key === 'parent') return '[Circular]';
            //       return value;
            //     },
            //     2
            //   )
            // );
            const classNameEnd = node.id?.range[1] ?? node.range[1];
            console.log('Class name end:', classNameEnd);
            context.report({
              node: node.id ?? node,
              message: `Class must implement ${interfaceName}`,
              fix(fixer: any) {
                // Use the extracted position to insert the text
                console.log('Attempting to apply fix');
                const fixResult = fixer.insertTextAfter(
                  node.id ?? node,
                  ' /* Fix applied here */'
                );
                console.log('Fix result:', fixResult);
                return [fixResult];
              },
            });
          }
        },
      };
    },
  } as unknown as RuleModule<string, readonly unknown[], RuleListener>;

  // Instantiate RuleTester with TypeScript parser
  const ruleTester = new TSESLint.RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),

    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  });

  // Define tests
  ruleTester.run('has-implements-interface', rule, {
    valid: [
      // This class does not implement 'MyInterface', so it's considered valid under our rule
      `class MyClass implements MyInterface {}`,
      `class MyClass implements AnotherInterface, MyInterface {}`,
      `class MyClass implements MyInterface, AnotherInterface {}`,
      `class MyClass extends AnotherClass implements MyInterface {}`,
    ],
    invalid: [
      {
        // This class implements 'MyInterface', so our rule should report it
        code: `class MyClass {}`,
        errors: [{ messageId: 'missingImplementsErrorAction' }],
        output: null,
      },
    ],
  });
});

// describe('fixMissingImplementsInterface', () => {
//   // Mock RuleFixer
//   const mockFixer: RuleFixer = {
//     insertTextAfter(node: any, text: any) {
//       return { range: [node.range[1], node.range[1]], text };
//     },
//   } as unknown as RuleFixer;

//   // Mock SourceCode (simplified)
//   const mockSourceCode: Partial<SourceCode> = {
//     getText() {
//       return '';
//     },
//   };

//   // Helper function to create a mock ClassDeclaration node
//   function createMockClassDeclaration(
//     options: Partial<TSESTree.ClassDeclaration> = {}
//   ): TSESTree.ClassDeclaration {
//     return {
//       type: AST_NODE_TYPES.ClassDeclaration,
//       id: {
//         type: AST_NODE_TYPES.Identifier,
//         name: 'TestClass',
//         range: [0, 10],
//       },
//       body: { type: AST_NODE_TYPES.ClassBody, body: [], range: [0, 0] },
//       range: [0, 0],
//       ...options,
//     } as unknown as TSESTree.ClassDeclaration;
//   }

//   it('should add implements clause to class without existing implements', () => {
//     const mockNode = createMockClassDeclaration();
//     const fixes = fixMissingImplementsInterface({
//       fixer: mockFixer,
//       interfaceName: 'TestInterface',
//       node: mockNode,
//       sourceCode: mockSourceCode as SourceCode,
//     });

//     expect(fixes).toHaveLength(1);
//     expect(fixes[0].text).toContain('implements TestInterface');
//   });

//   it('should not modify class with existing implements matching the interface', () => {
//     const mockNode = createMockClassDeclaration({
//       implements: [
//         {
//           type: AST_NODE_TYPES.TSClassImplements,
//           expression: {
//             type: AST_NODE_TYPES.Identifier,
//             name: 'TestInterface',
//           },
//         } as TSESTree.TSClassImplements,
//       ],
//     });
//     const fixes = fixMissingImplementsInterface({
//       fixer: mockFixer,
//       interfaceName: 'TestInterface',
//       node: mockNode,
//       sourceCode: mockSourceCode as SourceCode,
//     });

//     expect(fixes).toHaveLength(0);
//   });

//   it('should add implements clause to class with existing implements of different interface', () => {
//     const mockNode = createMockClassDeclaration({
//       implements: [
//         {
//           type: AST_NODE_TYPES.TSClassImplements,
//           expression: {
//             type: AST_NODE_TYPES.Identifier,
//             name: 'AnotherInterface',
//           },
//         } as TSESTree.TSClassImplements,
//       ],
//     });
//     const fixes = fixMissingImplementsInterface({
//       fixer: mockFixer,
//       interfaceName: 'TestInterface',
//       node: mockNode,
//       sourceCode: mockSourceCode as SourceCode,
//     });

//     expect(fixes).toHaveLength(1);
//     expect(fixes[0].text).toContain(', TestInterface');
//   });
// });
