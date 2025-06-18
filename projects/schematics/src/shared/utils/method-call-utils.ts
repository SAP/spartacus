/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { findNodes } from '@schematics/angular/utility/ast-utils';
import ts from 'typescript';
import { parseTsFileContent } from './file-utils';

interface ReplaceMethodCallArgumentParams {
  fileContent: string;
  objectName: string;
  methodName: string;
  argument: {
    position: number;
    oldText: string;
    newText: string;
  };
  throwErrorIfNotFound?: boolean;
}

interface FindMethodCallsParams {
  fileContent: string;
  objectName: string;
  methodName: string;
}

/**
 * Finds all method calls in the given file content.
 *
 * Returns the method calls.
 */
export function findMethodCalls({
  fileContent,
  objectName,
  methodName,
}: FindMethodCallsParams): ts.CallExpression[] {
  const sourceFile = parseTsFileContent(fileContent);

  // Get all method calls
  const nodes = findNodes(
    sourceFile,
    ts.SyntaxKind.CallExpression,
    undefined,
    true
  );

  return nodes.filter((node): node is ts.CallExpression => {
    if (!ts.isCallExpression(node)) {
      return false;
    }
    const expression = node.expression;
    if (!ts.isPropertyAccessExpression(expression)) {
      return false;
    }

    const object = expression.expression;
    const method = expression.name;

    if (!ts.isIdentifier(object) || !ts.isIdentifier(method)) {
      return false;
    }

    return object.text === objectName && method.text === methodName;
  });
}

/**
 * Replaces an argument in a method call in the given file content.
 * Works for multiple occurrences of the method call.
 *
 * It matches the call by the object name, method name, position of the argument,
 * and the argument text.
 *
 * Returns the updated file content.
 */
export function replaceMethodCallArgument({
  fileContent,
  objectName,
  methodName,
  argument,
  throwErrorIfNotFound = false,
}: ReplaceMethodCallArgumentParams): string {
  const targetNodes = findMethodCalls({
    fileContent,
    objectName,
    methodName,
  }).filter((node) => {
    // filter out method calls with less arguments than the expected argument position
    if (node.arguments.length <= argument.position) {
      return false;
    }

    // filter out method calls with the wrong argument text
    if (node.arguments[argument.position].getText() !== argument.oldText) {
      return false;
    }

    return true;
  });

  if (!targetNodes.length) {
    if (throwErrorIfNotFound) {
      throw new Error(
        `Could not replace ${objectName}.${methodName}() method call argument on position ${argument.position}`
      );
    }
    return fileContent;
  }

  // Replace all occurrences of the method call
  let updatedContent = fileContent;

  // Replace occurrences from last to first - to not interfere with
  // the already calculated start and end positions of the other occurrences
  const targetNodesReversed = [...targetNodes].reverse();
  targetNodesReversed.forEach((methodCallNode) => {
    const argumentToReplace = methodCallNode.arguments[argument.position];
    updatedContent =
      updatedContent.slice(0, argumentToReplace.getStart()) +
      argument.newText +
      updatedContent.slice(argumentToReplace.getEnd());
  });

  return updatedContent;
}
