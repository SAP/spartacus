/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicContext } from '@angular-devkit/schematics';
import { replaceMethodCallArgument } from '../../../shared/utils/method-call-utils';
import { replaceVariableDeclaration } from '../../../shared/utils/variable-utils';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../../fallback-advice-to-follow-docs';

/**
 * Updates variables and method calls in server.ts file.
 */
export function updateVariablesInServerTs(
  updatedContent: string,
  context: SchematicContext
): string {
  /*
   * Removes `distFolder` variable declaration and replaces with 2 new variables:
   * `serverDistFolder` and `browserDistFolder`
   *
   *   ```diff
   *   - const distFolder = join(process.cwd(), 'dist/<APP-NAME>/browser');
   *   +  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
   *   +  const browserDistFolder = resolve(serverDistFolder, '../browser');
   *   ```
   */
  try {
    context.logger.info(
      '  ↳ Replacing "distFolder" variable declaration with "serverDistFolder" and "browserDistFolder"'
    );
    updatedContent = replaceVariableDeclaration({
      fileContent: updatedContent,
      variableName: 'distFolder',
      newText: `const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');`,
      throwErrorIfNotFound: true,
    });
  } catch (error) {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      `Could not replace "distFolder" variable declaration`,
      context
    );
  }

  /*
   * Replace `indexHtml` variable declaration to use `browserDistFolder`
   *   ```diff
   *   - const indexHtml = existsSync(join(distFolder, 'index.original.html'))
   *   -   ? 'index.original.html'
   *   -   : 'index';
   *   +  const indexHtml = join(browserDistFolder, 'index.html');
   *   ```
   */
  try {
    context.logger.info(
      '  ↳ Changing "indexHtml" variable declaration to use "browserDistFolder"'
    );
    updatedContent = replaceVariableDeclaration({
      fileContent: updatedContent,
      variableName: 'indexHtml',
      newText: `const indexHtml = join(browserDistFolder, 'index.html');`,
      throwErrorIfNotFound: true,
    });
  } catch (error) {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      `Could not replace "indexHtml" variable declaration`,
      context
    );
  }

  /*
   * Change `server.set(_, distFolder)` to `server.set(_, browserDistFolder)`
   *
   *   ```diff
   *   -  server.set('views', distFolder);
   *   +  server.set('views', browserDistFolder);
   *   ```
   */
  try {
    context.logger.info(
      '  ↳ Replacing argument "distFolder" with "browserDistFolder" in "server.set()" method call'
    );
    updatedContent = replaceMethodCallArgument({
      fileContent: updatedContent,
      objectName: 'server',
      methodName: 'set',
      argument: {
        position: 1,
        oldText: 'distFolder',
        newText: 'browserDistFolder',
      },
      throwErrorIfNotFound: true,
    });
  } catch (error) {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      `Could not replace argument "distFolder" in "server.set()" method call`,
      context
    );
  }

  /*
   * Change `express.static(distFolder, { ... })` to `express.static(browserDistFolder, { ... })`
   *
   *   ```diff
   *   server.get(
   *     '*.*',
   *   -    express.static(distFolder, {
   *   +    express.static(browserDistFolder, {
   *   ```
   */
  try {
    context.logger.info(
      '  ↳ Replacing argument "distFolder" with "browserDistFolder" in "express.static()" method call'
    );
    updatedContent = replaceMethodCallArgument({
      fileContent: updatedContent,
      objectName: 'express',
      methodName: 'static',
      argument: {
        position: 0,
        oldText: 'distFolder',
        newText: 'browserDistFolder',
      },
      throwErrorIfNotFound: true,
    });
  } catch (error) {
    printErrorWithDocsForMigrated_6_8_To_2211_19(
      `Could not replace argument "distFolder" in "express.static()" method call`,
      context
    );
  }

  return updatedContent;
}
