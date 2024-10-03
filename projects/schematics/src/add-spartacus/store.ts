/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NGRX_EFFECTS, NGRX_STORE } from '../shared/constants';
import { addModuleImport } from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusOptions } from './schema';

/** Migration that ensures that we have correct Store modules set */
export function setupStoreModules(options: SpartacusOptions): Rule {
  return (tree: Tree, context): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Setting up store module...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot set Store modules.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      configureStoreModules(tree, tsconfigPath, basePath);
    }

    if (options.debug) {
      context.logger.info(`✅ Store module setup complete`);
    }
    return tree;
  };
}

function configureStoreModules(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (!sourceFile.getFilePath().includes('app.module.ts')) {
      continue;
    }

    addModuleImport(sourceFile, {
      import: {
        moduleSpecifier: NGRX_STORE,
        namedImports: ['StoreModule'],
      },
      content: `StoreModule.forRoot({})`,
    });
    addModuleImport(sourceFile, {
      import: {
        moduleSpecifier: NGRX_EFFECTS,
        namedImports: ['EffectsModule'],
      },
      content: `EffectsModule.forRoot([])`,
    });

    saveAndFormat(sourceFile);
    break;
  }
}
