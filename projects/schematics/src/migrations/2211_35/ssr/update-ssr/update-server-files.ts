/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

/**
 * Finds the server.ts file in the project.
 * Checks both root and src directory locations.
 */
function findServerFile(tree: Tree): string | null {
  const possiblePaths = ['./server.ts', './src/server.ts'];

  for (const path of possiblePaths) {
    if (tree.exists(normalize(path))) {
      return path;
    }
  }
  return null;
}

/**
 * Determines if a string literal uses single or double quotes.
 * @param node - The string literal node to check
 * @returns true for single quotes, false for double quotes
 */
function getQuotePreference(node: ts.StringLiteral): boolean {
  return node.getText().startsWith("'");
}

interface JoinCallResult {
  isMatch: boolean;
  quotePreference?: boolean;
}

/**
 * Checks if a node is a join() call with 'index.html' as the last argument.
 * Also determines the quote style used in the original code.
 */
function isJoinCallWithIndexHtml(node: ts.Node): JoinCallResult {
  if (!ts.isCallExpression(node)) {
    return { isMatch: false };
  }

  if (!ts.isIdentifier(node.expression) || node.expression.text !== 'join') {
    return { isMatch: false };
  }

  const lastArg = node.arguments[node.arguments.length - 1];
  if (!ts.isStringLiteral(lastArg)) {
    return { isMatch: false };
  }

  if (lastArg.text === 'index.html') {
    return {
      isMatch: true,
      quotePreference: getQuotePreference(lastArg),
    };
  }

  return { isMatch: false };
}

/**
 * Visits the node and tries to find recursively the indexHtml const.
 * When found, it updates the indexHtml const to use serverDistFolder and index.server.html.
 */
function visitNodeToUpdateIndexHtmlConst(
  node: ts.Node,
  content: string
): string {
  let updatedContent = content;

  if (ts.isVariableStatement(node)) {
    const declarations = node.declarationList.declarations;
    if (declarations.length === 1) {
      const declaration = declarations[0];
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === 'indexHtml' &&
        declaration.initializer
      ) {
        const { isMatch, quotePreference } = isJoinCallWithIndexHtml(
          declaration.initializer
        );
        if (isMatch) {
          const originalText = node.getText();
          const quote = quotePreference ? "'" : '"';
          const newText = `const indexHtml = join(serverDistFolder, ${quote}index.server.html${quote});`;
          updatedContent = updatedContent.replace(originalText, newText);
        }
      }
    }
  }

  // Recursively visit all children
  ts.forEachChild(node, (childNode) => {
    updatedContent = visitNodeToUpdateIndexHtmlConst(childNode, updatedContent);
  });

  return updatedContent;
}

/**
 * Creates a rule that updates the server.ts file to use index.server.html
 * instead of index.html when using the application builder.
 */
export function updateServerFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('🔍 Checking if server.ts needs to be updated...');
    const serverFilePath = findServerFile(tree);
    if (!serverFilePath) {
      context.logger.warn('🔍 Could not find server.ts file - skipping update');
      return;
    }

    context.logger.info(
      `🔄 Updating ${serverFilePath} to use index.server.html`
    );

    const fileContentBuffer = tree.read(serverFilePath);
    if (!fileContentBuffer) {
      context.logger.warn(
        `⚠️ Could not read ${serverFilePath} - skipping update`
      );
      return;
    }

    const content = fileContentBuffer.toString('utf-8');
    const sourceFile = ts.createSourceFile(
      'server.ts',
      content,
      ts.ScriptTarget.Latest,
      true
    );

    const updatedContent = visitNodeToUpdateIndexHtmlConst(sourceFile, content);

    if (updatedContent !== content) {
      tree.overwrite(serverFilePath, updatedContent);
      context.logger.info(`✅ Successfully updated ${serverFilePath}`);
    }
    return tree;
  };
}
