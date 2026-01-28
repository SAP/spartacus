/*
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
import {
  ANGULAR_CORE,
  APP_MODULE,
  PROVIDE_ZONE_CHANGE_DETECTION,
} from '../../../shared/constants';
import { addModuleProvider } from '../../../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

/**
 * Main migration rule that adds provideZoneChangeDetection to app.module.ts.
 * This is part of the Angular 21 upgrade process to move zone configuration
 * from application providers to module providers.
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '⌛️ Adding provideZoneChangeDetection to app.module.ts...'
    );

    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const { buildPaths } = getProjectTsConfigPaths(tree, projectName);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure app.module.ts.'
      );
    }

    // Process each tsconfig to find and modify app.module.ts files
    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      addProviderToAppModule(tree, tsconfigPath, basePath, context);
    }

    context.logger.info('✅ provideZoneChangeDetection added successfully.');
    return tree;
  };
}

/**
 * Adds provideZoneChangeDetection({ eventCoalescing: true }) to app.module.ts providers array.
 * Skips if the provider is already present to avoid duplicates.
 */
function addProviderToAppModule(
  tree: Tree,
  tsconfigPath: string,
  basePath: string,
  context: SchematicContext
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  // Find app.module.ts and add the provider
  for (const sourceFile of appSourceFiles) {
    if (sourceFile.getFilePath().includes(APP_MODULE)) {
      // Skip if provider is already present
      if (isProviderAlreadyAdded(sourceFile)) {
        context.logger.info(
          `provideZoneChangeDetection is already present in ${APP_MODULE}. Skipping...`
        );
        return;
      }

      // Add the provider and save the file
      addProvider(sourceFile);
      saveAndFormat(sourceFile);
      break;
    }
  }
}

/** Checks if provideZoneChangeDetection is already present in the file to avoid duplicates. */
function isProviderAlreadyAdded(sourceFile: SourceFile): boolean {
  const fileContent = sourceFile.getFullText();
  return fileContent.includes(PROVIDE_ZONE_CHANGE_DETECTION);
}

/**
 * Adds provideZoneChangeDetection({ eventCoalescing: true }) to the @NgModule providers array.
 * Uses addModuleProvider utility to handle import addition and provider insertion.
 */
function addProvider(sourceFile: SourceFile): void {
  addModuleProvider(sourceFile, {
    import: {
      moduleSpecifier: ANGULAR_CORE,
      namedImports: [PROVIDE_ZONE_CHANGE_DETECTION],
    },
    content: `${PROVIDE_ZONE_CHANGE_DETECTION}({ eventCoalescing: true })`,
  });
}
