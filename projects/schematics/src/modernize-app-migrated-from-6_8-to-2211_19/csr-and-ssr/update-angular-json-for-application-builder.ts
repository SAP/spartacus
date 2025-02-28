/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '../../shared/utils/workspace-utils';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates the Angular configuration file to new Angular v17 standards.
 *
 * Configures the new Angular application builder:
 * '@angular-devkit/build-angular:application',
 * updates output paths, and removes obsolete build options.
 */
export function updateAngularJsonForApplicationBuilder(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '\n⏳ Updating angular.json for application builder...'
    );

    const { workspace, path } = getWorkspace(tree);
    const project = workspace.projects[Object.keys(workspace.projects)[0]];

    if (!project) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'No project found in workspace',
        context
      );
      return;
    }

    const buildTarget = project.architect?.build;
    if (!buildTarget) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'No build target found in project configuration',
        context
      );
      return;
    }

    const newBuilder = '@angular-devkit/build-angular:application';
    context.logger.info(
      `  ↳ Updating builder to "${newBuilder}" from "${buildTarget.builder}"`
    );
    buildTarget.builder = newBuilder as any;

    context.logger.info('  ↳ Renaming "main" to "browser" in build options');
    const options = buildTarget.options as any;
    if (options?.main) {
      options.browser = options.main;
      delete options.main;
    } else {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'Could not rename "main" to "browser" in angular.json',
        context
      );
      return;
    }

    context.logger.info(
      '  ↳ Removing obsolete build options from "development" configuration'
    );
    const devConfig = (buildTarget as any).configurations?.development;
    if (devConfig) {
      delete devConfig.buildOptimizer;
      delete devConfig.vendorChunk;
      delete devConfig.namedChunks;
    } else {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'Could not update "development" configuration in angular.json',
        context
      );
      return;
    }

    context.logger.info('✅ Updated angular.json for application builder');
    const JSON_INDENT = 2;
    tree.overwrite(path, JSON.stringify(workspace, null, JSON_INDENT));
  };
}
