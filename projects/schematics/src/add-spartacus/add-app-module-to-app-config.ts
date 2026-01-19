/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { addRootImport } from '@schematics/angular/utility';
import { Schema as SpartacusOptions } from './schema';

/**
 * Adds importProvidersFrom(AppModule) to app.config.ts.
 */
export function addAppModuleToAppConfig(options: SpartacusOptions): Rule {
  return (_tree: Tree, context: SchematicContext): Rule => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding importProvidersFrom(AppModule) to app.config.ts...`
      );
    }

    return chain([
      addRootImport(options.project ?? 'default', ({ code, external }) => {
        return code`${external('AppModule', './app.module')}`;
      }),
      () => {
        if (options.debug) {
          context.logger.info(
            `✅ Added importProvidersFrom(AppModule) to app.config.ts`
          );
        }
      },
    ]);
  };
}
