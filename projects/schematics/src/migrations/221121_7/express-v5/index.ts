/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalize } from '@angular-devkit/core';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import * as ts from 'typescript';
import { getServerTsPath } from '../../../shared/utils/file-utils';
import {
  getServerTsPathForApplicationBuilder,
  isSsrUsed,
  isUsingLegacyServerBuilder,
  readPackageJson,
  updatePackageJsonDependencies,
} from '../../../shared/utils/package-utils';

/**
 * Finds the server.ts file in the project.
 * Uses the appropriate method based on SSR configuration.
 */
function findServerFile(tree: Tree): string | null {
  if (isSsrUsed(tree)) {
    const serverPath = getServerTsPathForApplicationBuilder(tree);
    if (serverPath) {
      return serverPath;
    }
  }

  if (isUsingLegacyServerBuilder(tree)) {
    const serverPath = getServerTsPath(tree);
    if (serverPath) {
      return serverPath;
    }
  }

  const possiblePaths = ['./server.ts', './src/server.ts'];
  for (const path of possiblePaths) {
    if (tree.exists(normalize(path))) {
      return path;
    }
  }

  return null;
}

/**
 * Updates server.ts file to replace wildcard strings with regex patterns for Express 5 compatibility.
 */
function updateServerTsFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '\n⌛️ Updating server.ts for Express 5 compatibility...'
    );

    const serverFilePath = findServerFile(tree);
    if (!serverFilePath) {
      context.logger.info(
        '  ↳ No server.ts file found - skipping server.ts updates'
      );
      return tree;
    }

    const fileContentBuffer = tree.read(serverFilePath);
    if (!fileContentBuffer) {
      context.logger.warn(
        `  ↳ Could not read ${serverFilePath} - skipping update`
      );
      return tree;
    }

    const content = fileContentBuffer.toString('utf-8');
    const originalContent = content;

    try {
      const sourceFile = ts.createSourceFile(
        serverFilePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );

      const replacements: Replacement[] = [];
      collectServerGetReplacements(sourceFile, sourceFile, replacements);

      const updatedContent =
        replacements.length > 0
          ? applyReplacements(content, replacements)
          : content;

      if (updatedContent !== originalContent) {
        tree.overwrite(serverFilePath, updatedContent);
        context.logger.info(
          `✅ Updated ${serverFilePath} for Express 5 compatibility`
        );
      } else {
        context.logger.info(
          `  ↳ ${serverFilePath} already uses Express 5 compatible patterns or no changes needed`
        );
      }
    } catch (error) {
      context.logger.warn(
        `  ↳ Failed to parse ${serverFilePath} - skipping update: ${error}`
      );
    }

    return tree;
  };
}

/**
 * Visits AST nodes to find server.get() calls and replace wildcard strings with regex patterns.
 */
interface Replacement {
  start: number;
  end: number;
  replacement: string;
}

function isServerGetCall(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const expression = node.expression;
  return (
    ts.isPropertyAccessExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.expression.text === 'server' &&
    ts.isIdentifier(expression.name) &&
    expression.name.text === 'get'
  );
}

function getWildcardReplacement(argText: string): string | null {
  if (argText === '*.*') {
    return '/.*\\..*/';
  }
  if (argText === '*') {
    return '/.*/';
  }
  return null;
}

function processServerGetCall(
  node: ts.CallExpression,
  sourceFile: ts.SourceFile,
  replacements: Replacement[]
): void {
  if (node.arguments.length === 0) {
    return;
  }

  const firstArg = node.arguments[0];
  if (!ts.isStringLiteral(firstArg)) {
    return;
  }

  const replacement = getWildcardReplacement(firstArg.text);
  if (replacement) {
    replacements.push({
      start: firstArg.getStart(sourceFile),
      end: firstArg.getEnd(),
      replacement,
    });
  }
}

function collectServerGetReplacements(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  replacements: Replacement[]
): void {
  if (isServerGetCall(node)) {
    processServerGetCall(node, sourceFile, replacements);
  }

  ts.forEachChild(node, (childNode) => {
    collectServerGetReplacements(childNode, sourceFile, replacements);
  });
}

function applyReplacements(
  content: string,
  replacements: Replacement[]
): string {
  const sortedReplacements = [...replacements].sort(
    (a, b) => b.start - a.start
  );

  let updatedContent = content;
  for (const replacement of sortedReplacements) {
    const before = updatedContent.substring(0, replacement.start);
    const after = updatedContent.substring(replacement.end);
    updatedContent = before + replacement.replacement + after;
  }

  return updatedContent;
}

/**
 * Updates Express dependency to version 5.1.0 in package.json.
 */
function updateExpressDependency(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    const dependencies: NodeDependency[] = [];

    if (packageJson.dependencies?.express) {
      dependencies.push({
        name: 'express',
        version: '^5.1.0',
        type: NodeDependencyType.Default,
        overwrite: true,
      });
    }

    if (packageJson.devDependencies?.express) {
      dependencies.push({
        name: 'express',
        version: '^5.1.0',
        type: NodeDependencyType.Dev,
        overwrite: true,
      });
    }

    if (dependencies.length === 0) {
      context.logger.info(
        '  ↳ Express is not installed - skipping Express dependency update'
      );
      return noop();
    }

    return updatePackageJsonDependencies(dependencies, packageJson)(
      tree,
      context
    );
  };
}

/**
 * Migration to upgrade Express to v5.1.0 and update server.ts for Express 5 compatibility.
 *
 * This migration:
 * 1. Updates Express dependency to ^5.1.0 in package.json
 * 2. Updates server.ts to replace wildcard strings with regex patterns:
 *    - '*.*' becomes regex pattern matching files with extensions
 *    - '*' becomes regex pattern matching all routes
 *
 * This migration only runs for apps that use SSR (Server-Side Rendering).
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const hasSSR = isSsrUsed(tree) || isUsingLegacyServerBuilder(tree);

    if (!hasSSR) {
      context.logger.info(
        '\n⏭️  Skipping Express v5 migration - SSR is not configured in this app'
      );
      return noop();
    }

    const packageJson = readPackageJson(tree);
    const hasExpress =
      packageJson.dependencies?.express ?? packageJson.devDependencies?.express;

    if (!hasExpress) {
      context.logger.info(
        '\n⏭️  Skipping Express v5 migration - Express is not installed in this app'
      );
      return noop();
    }

    return chain([updateExpressDependency(), updateServerTsFile()])(
      tree,
      context
    );
  };
}
