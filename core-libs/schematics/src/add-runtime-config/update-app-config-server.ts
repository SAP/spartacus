/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { getAppConfigServerProviders } from '../add-ssr/get-app-config-server-providers';
import { APP_CONFIG_SERVER } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

export function updateAppConfigServer(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${APP_CONFIG_SERVER}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const sourceFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(APP_CONFIG_SERVER)
      );

      if (!sourceFile) {
        continue;
      }

      if (sourceFile.getFullText().includes('provideEnvironmentServer')) {
        if (options.debug) {
          context.logger.info(
            `⏭️ Skipping ${APP_CONFIG_SERVER} — already contains provideEnvironmentServer.`
          );
        }
        continue;
      }

      const providersArray = getAppConfigServerProviders(sourceFile);
      if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
        createImports(sourceFile, [
          {
            moduleSpecifier: '@spartacus/setup',
            namedImports: ['provideEnvironmentServer'],
          },
        ]);

        // IMPORTANT: provideEnvironmentServer() MUST be the first provider —
        // before provideServerRendering(). Both register BEFORE_APP_SERIALIZED
        // hooks. Angular's serializeTransferStateFactory (registered by
        // provideServerRendering) checks transferStore.isEmpty and skips writing
        // <script id="ng-state"> entirely if the store is empty at that point.
        // provideEnvironmentServer() forces ENVIRONMENT injection and writes
        // cx-runtime-config into TransferState — it MUST run before the
        // serializer checks, or the browser will always fall back to fetching
        // /config.json even when SSR succeeds (Path B instead of Path A).
        //
        // The comment below is embedded in the generated app.config.server.ts
        // so developers who read the file understand the ordering constraint.
        providersArray.insertElements(0, [
          `// IMPORTANT: must be first — writes cx-runtime-config to TransferState\n  // before provideServerRendering's BEFORE_APP_SERIALIZED hook checks isEmpty.\n  // Moving it after provideServerRendering() silently breaks SSR config transfer.\n  provideEnvironmentServer()`,
        ]);

        formatFile(sourceFile);
        tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

        if (options.debug) {
          context.logger.info(`✅ Updated ${APP_CONFIG_SERVER}`);
        }
      }
    }

    return tree;
  };
}
