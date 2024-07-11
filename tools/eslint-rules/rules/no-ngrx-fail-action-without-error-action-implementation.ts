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
      missingErrorAction:
        '[Spartacus] Class name contains "fail" but does not implement ErrorAction interface.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      'ClassDeclaration[id.name=/Fail/]'(node: TSESTree.ClassDeclaration) {
        const ERROR_ACTION_NAME = 'ErrorAction';
        const SPARTACUS_CORE_NAME = '@spartacus/core';

        if (!isClassImplementingInterface(node, ERROR_ACTION_NAME)) {
          context.report({
            node,
            messageId: 'missingErrorAction',
            fix(fixer) {
              const sourceCode = context.sourceCode;
              const implementsText = getImplementsText(node, sourceCode);
              const fixes = createFixesForImplementsClause(
                node,
                fixer,
                implementsText
              );

              if (!isErrorActionImported(sourceCode, SPARTACUS_CORE_NAME)) {
                fixes.push(
                  ...createFixesForImportStatement(
                    sourceCode,
                    fixer,
                    SPARTACUS_CORE_NAME
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

function getImplementsText(
  node: TSESTree.ClassDeclaration,
  sourceCode: SourceCode
): string {
  let otherImplements = node.implements
    ? node.implements.map((impl) => sourceCode.getText(impl)).join(', ')
    : '';
  const optionalComma = otherImplements ? ', ' : '';
  return ` implements ${otherImplements}${optionalComma}ErrorAction`;
}

function createFixesForImplementsClause(
  node: TSESTree.ClassDeclaration,
  fixer: RuleFixer,
  implementsText: string
): RuleFix[] {
  const fixes = [];
  if (node.implements?.length > 0) {
    const lastImplementsNode = node.implements[node.implements.length - 1];
    fixes.push(fixer.insertTextAfter(lastImplementsNode, `, ErrorAction`));
  } else if (node.superClass) {
    fixes.push(fixer.insertTextAfter(node.superClass, implementsText));
  } else if (node.id) {
    fixes.push(fixer.insertTextAfter(node.id, implementsText));
  }
  return fixes;
}

function isErrorActionImported(
  sourceCode: SourceCode,
  spartacusCoreName: string
): boolean {
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );
  return importDeclarations.some(
    (declaration) =>
      declaration.type === AST_NODE_TYPES.ImportDeclaration &&
      declaration.source.value === spartacusCoreName &&
      declaration.specifiers.some(
        (specifier) =>
          specifier.type === AST_NODE_TYPES.ImportSpecifier &&
          specifier.imported.name === 'ErrorAction'
      )
  );
}

function createFixesForImportStatement(
  sourceCode: SourceCode,
  fixer: RuleFixer,
  spartacusCoreName: string
): RuleFix[] {
  const fixes = [];
  const importStatement = `import { ErrorAction } from '${spartacusCoreName}';\n`;
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );

  if (importDeclarations.length > 0) {
    const lastImport = importDeclarations[importDeclarations.length - 1];
    fixes.push(fixer.insertTextAfter(lastImport, `\n${importStatement}`));
  } else {
    fixes.push(fixer.insertTextBefore(sourceCode.ast.body[0], importStatement));
  }

  return fixes;
}
