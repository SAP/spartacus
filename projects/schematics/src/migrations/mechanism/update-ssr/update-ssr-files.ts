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
  source.statements.map((node) => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const importPath = node.moduleSpecifier.text;
      if (importPath.includes(EXPRESS_TOKENS)) {
        importPaths.push(importPath);
      }
    }
    return node;
  });

  return importPaths;
}

function updateTokenImportPaths(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.visit((filePath) => {
      if (filePath.endsWith('.ts')) {
        const fileContent = tree.read(filePath);
        if (fileContent) {
          const source = ts.createSourceFile(
            filePath,
            fileContent.toString(),
            ts.ScriptTarget.Latest,
            true
          );
          const importPaths = getExpressImportPaths(source);
          let updatedFileContent = fileContent.toString('utf-8');

          if (importPaths.length) {
            importPaths.forEach((path: string) => {
              updatedFileContent = updatedFileContent.replace(
                path,
                SSR_SETUP_IMPORT
              );
            });

            tree.overwrite(filePath, updatedFileContent);
          }
        }
      }
    });
    return tree;
  };
}
