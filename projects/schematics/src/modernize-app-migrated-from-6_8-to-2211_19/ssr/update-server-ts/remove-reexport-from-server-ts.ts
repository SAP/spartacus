/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { findNodes } from '@schematics/angular/utility/ast-utils';
import { parseTsFileContent } from '../../../shared/utils/file-utils';
import ts from 'typescript';
import { SchematicContext } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../../fallback-advice-to-follow-docs';

/**
 * Removes the re-export of the path `./src/main.server`.
 *
 *   ```diff
 *   - export * from './src/main.server';
 *   ```
 */
export function removeReexportFromServerTs(
  fileContent: string,
  context: SchematicContext
): string {
  const sourceFile = parseTsFileContent(fileContent);
  const nodes = findNodes(sourceFile, ts.SyntaxKind.ExportDeclaration);

  const reexportPath = './src/main.server';

  context.logger.info(
    `  ↳ Removing the re-export of the path "${reexportPath}"`
  );

  const exportNode = nodes.find((node) => {
    if (!ts.isExportDeclaration(node)) {
      return false;
    }
    const moduleSpecifier = node.moduleSpecifier;
    if (!moduleSpecifier) {
      return false;
    }
    return (
      ts.isStringLiteral(moduleSpecifier) &&
      moduleSpecifier.text === reexportPath
    );
  });

  if (!exportNode) {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      `Could not remove the re-export of the path ${reexportPath}`,
      context
    );
    return fileContent;
  }

  const start = exportNode.getFullStart();
  const end = exportNode.getEnd();
  return fileContent.slice(0, start) + fileContent.slice(end);
}
