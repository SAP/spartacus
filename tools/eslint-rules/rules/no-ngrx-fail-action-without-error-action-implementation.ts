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

import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import {
  RuleFix,
  RuleFixer,
  SourceCode,
} from '@typescript-eslint/utils/ts-eslint';

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
      recommended: 'recommended',
    },
    schema: [], // no options
    messages: {
      missingImplementsErrorAction:
        '[Spartacus] Class name contains "fail" but does not implement ErrorAction interface.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      'ClassDeclaration[id.name=/Fail/]'(node: TSESTree.ClassDeclaration) {
        const Constants = {
          ErrorAction: 'ErrorAction',
          SpartacusCore: '@spartacus/core',
        };

        if (!isClassImplementingInterface(node, Constants.ErrorAction)) {
          context.report({
            node,
            messageId: 'missingImplementsErrorAction',
            fix(fixer) {
              const sourceCode = context.sourceCode;
              const fixes = createFixesForImplementsClause(
                sourceCode,
                node,
                fixer,
                Constants.ErrorAction
              );

              if (
                !isIdentifierImported(
                  sourceCode,
                  Constants.ErrorAction,
                  Constants.SpartacusCore
                )
              ) {
                fixes.push(
                  ...createFixesForImportStatement(
                    sourceCode,
                    fixer,
                    Constants.ErrorAction,
                    Constants.SpartacusCore
                  )
                );
              }

              return fixes;
            },
          });
        }
      },
    };
  },
});

// utils functions

function isClassImplementingInterface(
  node: TSESTree.ClassDeclaration,
  interfaceName: string
): boolean {
  return node.implements?.some(
    (impl) =>
      impl.expression.type === AST_NODE_TYPES.Identifier &&
      impl.expression.name === interfaceName
  );
}

function createFixesForImplementsClause(
  sourceCode: SourceCode,
  node: TSESTree.ClassDeclaration,
  fixer: RuleFixer,
  interfaceName: string
): RuleFix[] {
  const implementsText = createImplementsText(node, interfaceName, sourceCode);

  const fixes = [];
  if (node.implements?.length > 0) {
    const lastImplementsNode = node.implements[node.implements.length - 1];
    fixes.push(fixer.insertTextAfter(lastImplementsNode, `, ${interfaceName}`));
  } else if (node.superClass) {
    fixes.push(fixer.insertTextAfter(node.superClass, implementsText));
  } else if (node.id) {
    fixes.push(fixer.insertTextAfter(node.id, implementsText));
  }
  return fixes;
}

function createImplementsText(
  node: TSESTree.ClassDeclaration,
  interfaceName: string,
  sourceCode: SourceCode
): string {
  let otherImplements = node.implements
    ? node.implements.map((impl) => sourceCode.getText(impl)).join(', ')
    : '';
  const optionalComma = otherImplements ? ', ' : '';
  return ` implements ${otherImplements}${optionalComma}${interfaceName}`;
}

/**
 * Tells whether the `importedIdentifier` is imported from `importPath` in the file of `sourceCode`.
 */
function isIdentifierImported(
  sourceCode: SourceCode,
  importedIdentifier: string,
  importPath: string
): boolean {
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );
  return importDeclarations.some(
    (declaration) =>
      declaration.type === AST_NODE_TYPES.ImportDeclaration &&
      declaration.source.value === importPath &&
      declaration.specifiers.some(
        (specifier) =>
          specifier.type === AST_NODE_TYPES.ImportSpecifier &&
          specifier.imported.name === importedIdentifier
      )
  );
}

/**
 * Adds an import in the file for `importedIdentifier` from `importPath`,
 * if it's missing in the file `sourceCode`.
 */
function createFixesForImportStatement(
  sourceCode: SourceCode,
  fixer: RuleFixer,
  importedIdentifier: string,
  importPath: string
): RuleFix[] {
  const fixes = [];
  const importStatementText = `import { ${importedIdentifier} } from '${importPath}';\n`;
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );

  if (importDeclarations.length > 0) {
    const lastImport = importDeclarations[importDeclarations.length - 1];
    fixes.push(fixer.insertTextAfter(lastImport, `\n${importStatementText}`));
  } else {
    fixes.push(
      fixer.insertTextBefore(sourceCode.ast.body[0], importStatementText)
    );
  }

  return fixes;
}
