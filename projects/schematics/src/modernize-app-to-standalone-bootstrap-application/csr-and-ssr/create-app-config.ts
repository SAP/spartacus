/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Creates src/app/app.config.ts with ApplicationConfig including:
 * - provideBrowserGlobalErrorListeners()
 * - provideZoneChangeDetection({ eventCoalescing: true })
 * - provideHttpClient(withFetch(), withInterceptorsFromDi())
 * - importProvidersFrom(AppModule)
 */
export function createAppConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appConfigPath = 'src/app/app.config.ts';

    if (tree.exists(appConfigPath)) {
      context.logger.warn(
        `⚠️ File ${appConfigPath} already exists, skipping creation`
      );
      return tree;
    }

    context.logger.info('⏳ Creating app.config.ts...');

    const appConfigContent = `
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppModule } from './app.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(AppModule),
  ],
};
`;

    tree.create(appConfigPath, appConfigContent);

    context.logger.info('✅ Created app.config.ts');

    return tree;
  };
}
