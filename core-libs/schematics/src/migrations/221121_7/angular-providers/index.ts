/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import { ANGULAR_CORE, APP_MODULE } from '../../../shared/constants';
import { addModuleProvider } from '../../../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

const PROVIDE_BROWSER_GLOBAL_ERROR_LISTENERS =
  'provideBrowserGlobalErrorListeners';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '⌛️ Adding provideBrowserGlobalErrorListeners to app.module.ts...'
    );

    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const { buildPaths } = getProjectTsConfigPaths(tree, projectName);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure app.module.ts.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      addProviderToAppModule(tree, tsconfigPath, basePath, context);
    }

    context.logger.info(
      '✅ provideBrowserGlobalErrorListeners added successfully.'
    );
    return tree;
  };
}

function addProviderToAppModule(
  tree: Tree,
  tsconfigPath: string,
  basePath: string,
  context: SchematicContext
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (sourceFile.getFilePath().includes(APP_MODULE)) {
      if (isProviderAlreadyAdded(sourceFile)) {
        context.logger.info(
          `provideBrowserGlobalErrorListeners is already present in ${APP_MODULE}. Skipping...`
        );
        return;
      }

      addProvider(sourceFile);
      saveAndFormat(sourceFile);
      break;
    }
  }
}

function isProviderAlreadyAdded(sourceFile: SourceFile): boolean {
  const fileContent = sourceFile.getFullText();
  return fileContent.includes(PROVIDE_BROWSER_GLOBAL_ERROR_LISTENERS);
}

function addProvider(sourceFile: SourceFile): void {
  addModuleProvider(sourceFile, {
    import: {
      moduleSpecifier: ANGULAR_CORE,
      namedImports: [PROVIDE_BROWSER_GLOBAL_ERROR_LISTENERS],
    },
    content: `${PROVIDE_BROWSER_GLOBAL_ERROR_LISTENERS}()`,
  });
}
