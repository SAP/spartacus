/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-ngrx-fail-action-without-error-action-implementation"
export const RULE_NAME =
  'no-ngrx-fail-action-without-error-action-implementation';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        '[Spartacus] Disallow class names containing "fail" that do not implement ErrorAction interface',
      recommended: 'strict',
    },
    schema: [], // no options
    messages: {
      missingErrorAction:
        '[Spartacus] Class name contains "fail" but does not implement ErrorAction interface.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node: TSESTree.ClassDeclaration) {
        if (node.id && node.id.name.toLowerCase().includes('fail')) {
          const implementsErrorAction = node.implements?.some(
            (impl) =>
              impl.expression.type === 'Identifier' &&
              impl.expression.name === 'ErrorAction'
          );

          if (!implementsErrorAction) {
            context.report({
              node,
              messageId: 'missingErrorAction',
              fix(fixer) {
                const sourceCode = context.getSourceCode();
                let otherImplements = node.implements
                  ? node.implements
                      .map((impl) => sourceCode.getText(impl))
                      .join(', ')
                  : '';
                const optionalComma = otherImplements ? ', ' : '';
                const errorActionText = `ErrorAction`;
                const implementsText = ` implements ${otherImplements}${optionalComma}${errorActionText}`;
                const fixes = [];

                // Add the implements clause
                if (node.implements?.length > 0) {
                  const lastImplementsNode =
                    node.implements[node.implements.length - 1];
                  fixes.push(
                    fixer.insertTextAfter(
                      lastImplementsNode,
                      `, ${errorActionText}`
                    )
                  );
                } else if (node.superClass) {
                  const superClassNode = node.superClass;
                  fixes.push(
                    fixer.insertTextAfter(superClassNode, implementsText)
                  );
                } else if (node.id) {
                  fixes.push(fixer.insertTextAfter(node.id, implementsText));
                }

                // Check if ErrorAction is already imported
                const importDeclarations = sourceCode.ast.body.filter(
                  (statement) => statement.type === 'ImportDeclaration'
                );
                const isErrorActionImported = importDeclarations.some(
                  (declaration) =>
                    declaration.type === 'ImportDeclaration' &&
                    declaration.source.value === '@spartacus/core' &&
                    declaration.specifiers.some(
                      (specifier) =>
                        specifier.type === 'ImportSpecifier' &&
                        specifier.imported.name === 'ErrorAction'
                    )
                );

                // Add import statement if ErrorAction is not imported
                if (!isErrorActionImported) {
                  const importStatement = `import { ErrorAction } from '@spartacus/core';\n`;
                  if (importDeclarations.length > 0) {
                    const lastImport =
                      importDeclarations[importDeclarations.length - 1];
                    fixes.push(
                      fixer.insertTextAfter(lastImport, `\n${importStatement}`)
                    );
                  } else {
                    fixes.push(
                      fixer.insertTextBefore(
                        sourceCode.ast.body[0],
                        importStatement
                      )
                    );
                  }
                }

                return fixes;
              },
            });
          }
        }
      },
    };
  },

  // meta: {
  //   type: 'problem',
  //   docs: {
  //     description:
  //       'Ensure NgRx Action Classes with the word "Fail" in their name implement the `ErrorAction` interface',
  //     recommended: 'recommended',
  //   },
  //   schema: [],
  //   messages: {
  //     missingImplementsErrorAction:
  //       '[Spartacus] NgRx Action Class `{{ className }}` should implement `ErrorAction` interface. Otherwise the `CxErrorHandlerEffect` will not recognize it as Failure/Error action.',
  //   },
  //   fixable: 'code',
  // },
  // defaultOptions: [],
  // create(context) {
  //   return {
  //     ClassDeclaration(node) {
  //       const className = node.id?.name;

  //       if (className && /Fail/.test(className)) {
  //         const implementsErrorAction = node.implements?.some(
  //           (implementNode) =>
  //             implementNode.expression.type === 'Identifier' &&
  //             implementNode.expression.name === 'ErrorAction'
  //         );

  //         if (!implementsErrorAction) {
  //           context.report({
  //             node,
  //             messageId: 'missingImplementsErrorAction',
  //             data: { className },
  //             fix(fixer) {
  //               const sourceCode = context.getSourceCode();
  //               const implementsText = ' implements ErrorAction';

  //               if (node.implements && node.implements.length > 0) {
  //                 // If there are existing implements, append ErrorAction
  //                 const lastImplementNode =
  //                   node.implements[node.implements.length - 1];
  //                 return fixer.insertTextAfter(
  //                   lastImplementNode,
  //                   `, ErrorAction`
  //                 );
  //               } else if (node.superClass) {
  //                 // If there is an extends clause but no implements clause
  //                 return fixer.insertTextAfter(node.superClass, implementsText);
  //               } else {
  //                 // If there is no extends clause and no implements clause
  //                 return fixer.insertTextAfter(node.id, implementsText);
  //               }
  //             },
  //           });
  //         }
  //       }
  //     },
  //   };
  // },
});
