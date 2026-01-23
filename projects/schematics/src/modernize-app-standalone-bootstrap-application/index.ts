/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { isSsrUsed } from '../shared/utils/package-utils';
import { createAppConfig } from './csr-and-ssr/create-app-config';
import { updateAngularJson } from './csr-and-ssr/update-angular-json';
import { updateAppComponent } from './csr-and-ssr/update-app-component';
import { updateAppModule } from './csr-and-ssr/update-app-module';
import { updateMainTs } from './csr-and-ssr/update-main-ts';
import { withFallbackDocsForStandaloneBootstrap } from './fallback-advice-to-follow-docs';
import { createAppConfigServer } from './ssr/create-app-config-server';
import { moveHydrationConfig } from './ssr/move-hydration-config';
import { updateAppModuleServer } from './ssr/update-app-module-server';
import { updateMainServerTs } from './ssr/update-main-server-ts';
import { updateServerTs } from './ssr/update-server-ts';

/**
 * Migration schematic to modernize Angular apps to use standalone bootstrapApplication API.
 *
 * This migration automates the process of converting from:
 * - `platformBrowser().bootstrapModule(AppModule)` to `bootstrapApplication(AppComponent, appConfig)`
 */
export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      // Common transformations for both CSR and SSR apps
      withFallbackDocsForStandaloneBootstrap(updateAppComponent()),
      withFallbackDocsForStandaloneBootstrap(updateAppModule()),
      withFallbackDocsForStandaloneBootstrap(createAppConfig()),
      withFallbackDocsForStandaloneBootstrap(updateMainTs()),
      withFallbackDocsForStandaloneBootstrap(updateAngularJson()),

      // SSR-specific transformations
      ...(isSsrUsed(tree)
        ? [
            withFallbackDocsForStandaloneBootstrap(moveHydrationConfig()),
            withFallbackDocsForStandaloneBootstrap(createAppConfigServer()),
            withFallbackDocsForStandaloneBootstrap(updateAppModuleServer()),
            withFallbackDocsForStandaloneBootstrap(updateMainServerTs()),
            withFallbackDocsForStandaloneBootstrap(updateServerTs()),
          ]
        : []),
    ]);
  };
}
