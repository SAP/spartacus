/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Path } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  APP_MODULE,
  APP_ROUTING_MODULE,
  APP_ROUTING_MODULE_LOCAL_FILENAME,
  APP_ROUTING_MODULE_LOCAL_PATH,
} from '../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../shared/libs-constants';
import {
  addModuleImport,
  removeModuleImport,
} from '../shared/utils/new-module-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusOptions } from './schema';

/**
 * Updates AppModule to import AppRoutingModule from Spartacus.
 */
export function updateAppModule(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating AppModule...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure AppModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (sourceFile.getFilePath().includes(APP_MODULE)) {
          addAppRoutingModuleImport(tree, context, sourceFile, options);

          formatFile(sourceFile);
          tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());
          break;
        }
      }
    }

    if (options.debug) {
      context.logger.info(`✅ AppModule update complete.`);
    }
    return tree;
  };
}

/**
 * Adds `import { AppRoutingModule } from "@spartacus/storefront"` to the given app.module sourceFile.
 *
 * If a local file with the same module name `AppRoutingModule` already exists in the project,
 * it will be removed first, and later the `AppRoutingModule` from `@spartacus/storefront` will be imported.
 *
 * Note: Since v17 Angular `ng new` command by default creates a local `AppRoutingModule` file in the project.
 *       So we have to replace it.
 *
 * See Angular enabling routing by default in v17: https://github.com/angular/angular-cli/commit/1a6a139aaf8d5a6947b399bbbd48bbfd9e52372c
 */
function addAppRoutingModuleImport(
  tree: Tree,
  context: SchematicContext,
  sourceFile: SourceFile,
  options: SpartacusOptions
) {
  if (options.debug) {
    context.logger.info(
      `⌛️ Removing from AppModule's imports array a local AppRoutingModule, if exists`
    );
  }
  // remove import of AppRoutingModule (NgModule import and module path import), if exists
  const removedImport = removeModuleImport(sourceFile, {
    importPath: APP_ROUTING_MODULE_LOCAL_PATH,
    content: APP_ROUTING_MODULE,
  });
  if (options.debug) {
    context.logger.info(
      removedImport
        ? `✅ Removed from AppModule's imports array a local AppRoutingModule`
        : `✅ No local AppRoutingModule found in AppModule's imports array`
    );
  }

  if (options.debug) {
    context.logger.info(
      `⌛️ Deleting a local file "${APP_ROUTING_MODULE_LOCAL_FILENAME}", if exists`
    );
  }
  // delete local file of AppRoutingModule, if exists
  let deletedFile: Path | undefined;
  tree.visit((filePath: Path) => {
    if (filePath.endsWith(APP_ROUTING_MODULE_LOCAL_FILENAME)) {
      tree.delete(filePath);
      if (options.debug) {
        context.logger.info(`✅ Deleted a local file: ${filePath}`);
      }
      deletedFile = filePath;
    }
  });
  if (!deletedFile && options.debug) {
    context.logger.info(
      `✅ No local file found with the path "${APP_ROUTING_MODULE_LOCAL_FILENAME}"`
    );
  }

  if (options.debug) {
    context.logger.info(
      `⌛️ Importing AppRoutingModule of Spartacus in AppModule`
    );
  }
  // add import of AppRoutingModule from Spartacus
  addModuleImport(sourceFile, {
    order: 2,
    import: {
      moduleSpecifier: SPARTACUS_STOREFRONTLIB,
      namedImports: [APP_ROUTING_MODULE],
    },
    content: APP_ROUTING_MODULE,
  });
  if (options.debug) {
    context.logger.info(
      `✅ Imported AppRoutingModule of Spartacus in AppModule`
    );
  }
}
