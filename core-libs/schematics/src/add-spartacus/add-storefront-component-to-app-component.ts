/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { APP_COMPONENT } from '../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../shared/libs-constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { addImportsToComponentDecorator } from './add-imports-to-component-decorator';
import { Schema as SpartacusOptions } from './schema';

/**
 * Adds StorefrontComponent to app.component.ts imports array.
 */
export function addStorefrontComponentToAppComponent(
  options: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding StorefrontComponent to ${APP_COMPONENT} imports...`
      );
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (sourceFile.getFilePath().includes(APP_COMPONENT)) {
          // Add import for StorefrontComponent
          createImports(sourceFile, [
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: ['StorefrontComponent'],
            },
          ]);

          // Add StorefrontComponent to @Component imports array
          addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
            removeOldImports: true,
          });

          // Save changes to tree
          formatFile(sourceFile);
          tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());
          context.logger.info(
            `✅ Added StorefrontComponent to ${APP_COMPONENT} imports`
          );
          break;
        }
      }
    }

    if (options.debug) {
      context.logger.info(`✅ App component update complete.`);
    }

    return tree;
  };
}
