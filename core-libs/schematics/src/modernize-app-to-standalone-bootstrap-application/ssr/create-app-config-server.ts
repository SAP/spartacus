/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Creates src/app/app.config.server.ts with server configuration:
 * - Imports appConfig from app.config
 * - Adds provideServerRendering()
 * - Uses mergeApplicationConfig to combine configs
 * - Imports AppServerModule providers
 */
export function createAppConfigServer(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appConfigServerPath = 'src/app/app.config.server.ts';

    if (tree.exists(appConfigServerPath)) {
      context.logger.warn(
        `⚠️ File ${appConfigServerPath} already exists, skipping creation`
      );
      return tree;
    }

    context.logger.info('⏳ Creating app.config.server.ts...');

    const appConfigServerContent = `import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(AppServerModule),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
`;

    tree.create(appConfigServerPath, appConfigServerContent);

    context.logger.info('✅ Created app.config.server.ts');

    return tree;
  };
}
