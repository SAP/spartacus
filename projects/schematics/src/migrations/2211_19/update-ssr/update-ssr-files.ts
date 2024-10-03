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
import * as ts from 'typescript';
import {
  EXPRESS_TOKENS,
  NEW_ZONE_IMPORT,
  NGUNIVERSAL_IMPORT,
  OLD_ZONE_IMPORT,
  SERVER_BAK_FILENAME,
  SERVER_FILENAME,
  SSR_SETUP_IMPORT,
} from '../../../shared/constants';
import { Path } from '@angular-devkit/core';

export function updateServerFiles(): Rule {
  return chain([
    removeServer,
    modifyServerImports,
    removeExpressTokensFile,
    updateTokenImportPaths,
  ]);
}

function removeServer(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let serverPath: Path | undefined;
    let serverBakPath: Path | undefined;

    tree.visit((filePath: Path) => {
      const fileName = filePath.replace(/^.*[\\/]/, '');
      if (fileName === SERVER_FILENAME) {
        serverPath = filePath;
      }

      if (fileName === SERVER_BAK_FILENAME) {
        serverBakPath = filePath;
      }
    });

    if (serverPath && serverBakPath) {
      tree.delete(serverPath);
      tree.rename(serverBakPath, serverPath);
    }
  };
}

function modifyServerImports(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const serverFileBuffer = tree.read(SERVER_FILENAME);
    if (!serverFileBuffer) {
      return tree;
    }
    let updateContent = serverFileBuffer.toString('utf-8');
    const hasOldImport =
      updateContent.includes(OLD_ZONE_IMPORT) ||
      updateContent.includes(NGUNIVERSAL_IMPORT);
    if (hasOldImport) {
      updateContent = updateContent.replace(OLD_ZONE_IMPORT, NEW_ZONE_IMPORT);
      updateContent = updateContent.replace(
        NGUNIVERSAL_IMPORT,
        SSR_SETUP_IMPORT
      );
      tree.overwrite(SERVER_FILENAME, updateContent);
    }
    return tree;
  };
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
