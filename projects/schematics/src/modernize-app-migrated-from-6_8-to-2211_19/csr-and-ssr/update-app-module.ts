/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { removeImportFromContent } from '../../shared';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates `app.module.ts` file for new Angular v17 standards.
 *
 * Removes `HttpClientModule` in favor of `provideHttpClient()`,
 * with using `withFetch` and `withInterceptorsFromDi()`,
 * and removes the obsolete method `BrowserModule.withServerTransition()`.
 */
export function updateAppModule(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModulePath = 'src/app/app.module.ts';
    context.logger.info(`\n⏳ Updating ${appModulePath}...`);

    if (!tree.exists(appModulePath)) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `No ${appModulePath} found`,
        context
      );
      return;
    }

    const content = tree.read(appModulePath);
    if (!content) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        `Could not read content of ${appModulePath}`,
        context
      );
      return;
    }

    let updatedContent = content.toString();

    context.logger.info(
      '  ↳ Removing import of HttpClientModule from @angular/common/http'
    );
    updatedContent = removeImportFromContent(updatedContent, {
      symbolName: 'HttpClientModule',
      importPath: '@angular/common/http',
    });

    context.logger.info('  ↳ Removing usage of HttpClientModule');
    updatedContent = updatedContent.replace(/HttpClientModule,?\s*/g, '');

    context.logger.info('  ↳ Adding provideHttpClient to NgModule providers');
    if (!updatedContent.includes('provideHttpClient')) {
      updatedContent = updatedContent.replace(
        /providers:\s*\[/,
        'providers: [\n    provideHttpClient(withFetch(), withInterceptorsFromDi()),'
      );

      context.logger.info(
        '  ↳ Adding imports of provideHttpClient, withFetch, withInterceptorsFromDi from @angular/common/http'
      );
      const httpImport =
        "import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';\n";
      if (updatedContent.includes('import {')) {
        updatedContent = updatedContent.replace(
          /import {/,
          `${httpImport}import {`
        );
      }
    }

    tree.overwrite(appModulePath, updatedContent);

    context.logger.info(`✅ Updated ${appModulePath}`);
  };
}
