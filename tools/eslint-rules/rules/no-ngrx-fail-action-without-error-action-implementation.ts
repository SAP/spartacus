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

        if (!hasImplementsInterface(node, Constants.ErrorAction)) {
          context.report({
            node,
            messageId: 'missingImplementsErrorAction',
            fix(fixer) {
              const sourceCode = context.sourceCode;
              return [
                ...fixMissingImplementsInterface({
                  node,
                  interfaceName: Constants.ErrorAction,
                  sourceCode,
                  fixer,
                }),

                ...fixPossiblyMissingImport({
                  importedIdentifier: Constants.ErrorAction,
                  importPath: Constants.SpartacusCore,
                  sourceCode,
                  fixer,
                }),
              ];
            },
          });
        }
      },
    };
  },
});

// utils functions

function hasImplementsInterface(
  node: TSESTree.ClassDeclaration,
  interfaceName: string
): boolean {
  return node.implements?.some(
    (impl) =>
      impl.expression.type === AST_NODE_TYPES.Identifier &&
      impl.expression.name === interfaceName
  );
}

/**
 * Adds missing `implements` clause for the class declaration.
 *
 * - if there are already implemented interfaces, it adds the new one at the end
 * - if there is a superclass, it adds the new interface after it
 * - if there is no superclass, it adds the new interface after the class name
 */
function fixMissingImplementsInterface({
  interfaceName,
  node,
  sourceCode,
  fixer,
}: {
  node: TSESTree.ClassDeclaration;
  interfaceName: string;
  sourceCode: SourceCode;
  fixer: RuleFixer;
}): RuleFix[] {
  const implementsText = createImplementsText({
    node,
    interfaceName,
    sourceCode,
  });

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

/**
 * Returns a string with the `implements` clause for the class declaration.
 *
 * - if there are already implemented interfaces, it adds the new one at the end
 * - if there is a superclass, it adds the new interface after it
 * - if there is no superclass, it adds the new interface after the class name
 */
function createImplementsText({
  node,
  interfaceName,
  sourceCode,
}: {
  node: TSESTree.ClassDeclaration;
  interfaceName: string;
  sourceCode: SourceCode;
}): string {
  let otherImplements = node.implements
    ? node.implements.map((impl) => sourceCode.getText(impl)).join(', ')
    : '';
  const optionalComma = otherImplements ? ', ' : '';
  return ` implements ${otherImplements}${optionalComma}${interfaceName}`;
}

/**
 * Tells whether the `importedIdentifier` is imported from `importPath` in the file of `sourceCode`.
 */
function isIdentifierImported({
  importedIdentifier,
  importPath,
  sourceCode,
}: {
  importedIdentifier: string;
  importPath: string;
  sourceCode: SourceCode;
}): boolean {
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
function fixPossiblyMissingImport({
  importedIdentifier,
  importPath,
  sourceCode,
  fixer,
}: {
  importedIdentifier: string;
  importPath: string;
  sourceCode: SourceCode;
  fixer: RuleFixer;
}): RuleFix[] {
  if (isIdentifierImported({ sourceCode, importedIdentifier, importPath })) {
    return [];
  }

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
