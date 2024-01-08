/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { BASE_STOREFRONT_MODULE } from '../shared/constants';
import {
  SPARTACUS_MODULE,
  SPARTACUS_STOREFRONTLIB,
} from '../shared/libs-constants';
import {
  addModuleExport,
  addModuleImport,
} from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusOptions } from './schema';

/** Migration which ensures the spartacus is being correctly set up */
export function setupSpartacusModule(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Setting up Spartacus module...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure SpartacusModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      configureSpartacusModules(tree, tsconfigPath, basePath);
    }

    if (options.debug) {
      context.logger.info(`✅ Spartacus module setup complete.`);
    }
    return tree;
  };
}

function configureSpartacusModules(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (!sourceFile.getFilePath().includes(`${SPARTACUS_MODULE}.module.ts`)) {
      continue;
    }

    addModuleImport(sourceFile, {
      import: {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: [BASE_STOREFRONT_MODULE],
      },
      content: BASE_STOREFRONT_MODULE,
      order: 0,
    });
    addModuleExport(sourceFile, {
      import: {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: [BASE_STOREFRONT_MODULE],
      },
      content: BASE_STOREFRONT_MODULE,
    });

    saveAndFormat(sourceFile);
    break;
  }
}
