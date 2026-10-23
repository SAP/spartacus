/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { APP_CONFIG } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { getAppConfigProviders } from '../add-ssr/get-app-config-providers';

export function updateAppConfig(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${APP_CONFIG}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const sourceFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(APP_CONFIG)
      );

      if (sourceFile) {
        if (sourceFile.getFullText().includes('provideRuntimeOccConfig')) {
          continue;
        }

        createImports(sourceFile, [
          {
            moduleSpecifier: '@spartacus/setup',
            namedImports: ['provideRuntimeOccConfig'],
          },
        ]);

        const providersArray = getAppConfigProviders(sourceFile);
        if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
          providersArray.insertElement(0, 'provideRuntimeOccConfig()');
        }

        formatFile(sourceFile);
        tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

        if (options.debug) {
          context.logger.info(`✅ Updated ${APP_CONFIG}`);
        }
      }
    }

    return tree;
  };
}
