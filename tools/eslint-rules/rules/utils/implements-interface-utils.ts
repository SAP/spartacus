/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import {
  RuleFix,
  RuleFixer,
  SourceCode,
} from '@typescript-eslint/utils/ts-eslint';

/**
 * Tells whether the class declaration `node` has an `implements` clause with the given `interfaceName`.
 */
export function hasImplementsInterface(
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
export function fixMissingImplementsInterface({
  fixer,
  interfaceName,
  node,
  sourceCode,
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
