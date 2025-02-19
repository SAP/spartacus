/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { findNodes } from '@schematics/angular/utility/ast-utils';
import { parseTsFileContent } from '../../../shared/utils/file-utils';
import { removeVariableDeclaration } from '../../../shared/utils/variable-utils';
import ts from 'typescript';
import { SchematicContext } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../../fallback-advice-to-follow-docs';

/**
 * Removes the Webpack-specific comments.
 *
 *   ```diff
 *   - // Webpack will replace 'require' with '__webpack_require__'
 *   - // '__non_webpack_require__' is a proxy to Node 'require'
 *   - // The below code is to ensure that the server is run only when not requiring the bundle.
 */
function removeWebpackSpecificComments(
  fileContent: string,
  context: SchematicContext
): string {
  context.logger.info('  ↳ Removing Webpack-specific code comments //');
  return fileContent
    .replace(
      /\/\/ Webpack will replace 'require' with '__webpack_require__'\n/,
      ''
    )
    .replace(
      /\/\/ '__non_webpack_require__' is a proxy to Node 'require'\n/,
      ''
    )
    .replace(
      /\/\/ The below code is to ensure that the server is run only when not requiring the bundle\.\n/,
      ''
    );
}

/**
 * Removes the Webpack-specific code and replaces with a simple `run()` call.
 *
 *   ```diff
 *   - declare const __non_webpack_require__: NodeRequire;
 *   - const mainModule = __non_webpack_require__.main;
 *   - const moduleFilename = (mainModule && mainModule.- filename) || '';
 *   - if (moduleFilename === __filename || moduleFilename.- includes('iisnode')) {
 *   -   run();
 *   - }
 *   + run();
 *   ```
 */
function removeWebpackSpecificCode(
  fileContent: string,
  context: SchematicContext
): string {
  let updatedContent = fileContent;

  context.logger.info('  ↳ Removing Webpack-specific code');

  context.logger.info('    ↳ Removing const "__non_webpack_require__"');
  updatedContent = removeVariableDeclaration({
    fileContent: updatedContent,
    variableName: '__non_webpack_require__',
  });

  context.logger.info('    ↳ Removing const "mainModule"');
  updatedContent = removeVariableDeclaration({
    fileContent: updatedContent,
    variableName: 'mainModule',
  });

  context.logger.info('    ↳ Removing const "moduleFilename"');
  updatedContent = removeVariableDeclaration({
    fileContent: updatedContent,
    variableName: 'moduleFilename',
  });

  context.logger.info(
    '    ↳ Removing "if" statement wrapping the "run()" call'
  );
  const sourceFile = parseTsFileContent(updatedContent);
  const ifNodes = findNodes(sourceFile, ts.SyntaxKind.IfStatement);
  const ifNode = ifNodes.find((node) => {
    if (!ts.isIfStatement(node)) {
      return false;
    }
    const condition = node.expression;
    return (
      condition.getText().includes('moduleFilename === __filename') &&
      condition.getText().includes("moduleFilename.includes('iisnode')")
    );
  });

  if (ifNode) {
    const start = ifNode.getFullStart();
    const end = ifNode.getEnd();
    updatedContent = updatedContent.slice(0, start) + updatedContent.slice(end);
  } else {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      'Could not remove the Webpack-specific `if` block',
      context
    );
    return updatedContent;
  }

  context.logger.info('    ↳ Adding standalone "run()" call');
  return (
    updatedContent +
    `
run();
`
  );
}

/**
 * Removes the Webpack-specific code and comments from the server.ts file.
 */
export function removeWebpackFromServerTs(
  updatedContent: string,
  context: SchematicContext
): string {
  updatedContent = removeWebpackSpecificComments(updatedContent, context);
  updatedContent = removeWebpackSpecificCode(updatedContent, context);
  return updatedContent;
}
