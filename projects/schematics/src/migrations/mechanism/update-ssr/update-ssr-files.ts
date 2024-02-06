/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';

import { Path } from '@angular-devkit/core';
import * as ts from 'typescript';
import { EXPRESS_TOKENS, SSR_SETUP_IMPORT } from '../../../shared/constants';

export function updateServerFiles(): Rule {
  return chain([removeExpressTokensFile, updateTokenImportPaths]);
}

function removeExpressTokensFile(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.visit((filePath: Path) => {
      if (filePath.endsWith(`${EXPRESS_TOKENS}.ts`)) {
        tree.delete(filePath);
      }
    });
    return tree;
  };
}

function getExpressImportPaths(source: ts.SourceFile): string[] {
  const importPaths: string[] = [];
  source.statements.forEach((node) => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const importPath = node.moduleSpecifier.text;
      if (importPath.includes(EXPRESS_TOKENS)) {
        importPaths.push(importPath);
      }
    }
  });

  return importPaths;
}

function updateTokenImportPaths(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.visit((filePath) => {
      if (filePath.endsWith('.ts')) {
        const fileContentBuffer = tree.read(filePath);
        if (fileContentBuffer) {
          const fileContent = fileContentBuffer.toString('utf-8');

          const source = ts.createSourceFile(
            filePath,
            fileContent,
            ts.ScriptTarget.Latest,
            true
          );
          const importPaths = getExpressImportPaths(source);

          if (importPaths.length) {
            const importPathsRegex = new RegExp(importPaths.join('|'), 'g');
            const updatedFileContent = fileContent.replace(
              importPathsRegex,
              SSR_SETUP_IMPORT
            );

            tree.overwrite(filePath, updatedFileContent);
          }
        }
      }
    });
    return tree;
  };
}
