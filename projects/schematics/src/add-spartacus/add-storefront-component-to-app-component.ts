/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SPARTACUS_STOREFRONTLIB } from '../shared/libs-constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { addToComponentDecorator } from './add-to-component-decorator';
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
        `⌛️ Adding StorefrontComponent to app.component.ts imports...`
      );
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (sourceFile.getFilePath().includes('app.component.ts')) {
          // Add import for StorefrontComponent
          createImports(sourceFile, [
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: ['StorefrontComponent'],
            },
          ]);

          // Add StorefrontComponent to @Component imports array
          addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

          // Save changes to tree
          tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

          context.logger.info(
            `✅ Added StorefrontComponent to app.component.ts imports`
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
