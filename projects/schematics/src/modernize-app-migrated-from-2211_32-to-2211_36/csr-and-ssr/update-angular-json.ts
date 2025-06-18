/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  BrowserBuilderBaseOptions,
  BrowserBuilderTarget,
} from '@schematics/angular/utility/workspace-models';
import { getWorkspace } from '../../shared/utils/workspace-utils';
import { printErrorWithDocsForMigrated_2211_32_To_2211_36 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Updates the Angular configuration file to new Angular v19 standards.
 *
 * It updates the "assets" property for the "build" and "test" targets,
 * to use the new path with the `public/` folder,
 * instead of `src/assets` and `src/favicon.ico`.
 */
export function updateAngularJson(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('\n⏳ Updating angular.json assets configuration...');

    const { workspace, path } = getWorkspace(tree);
    const project = workspace.projects[Object.keys(workspace.projects)[0]];

    if (!project) {
      printErrorWithDocs('No project found in workspace', context);
      return;
    }

    const buildTarget = project.architect?.build as BrowserBuilderTarget;
    const testTarget = project.architect?.test;

    if (!buildTarget) {
      printErrorWithDocs(
        'Could not find "build" target in project configuration',
        context
      );
      return;
    }

    const oldAssets: BrowserBuilderBaseOptions['assets'] = [
      'src/favicon.ico',
      'src/assets',
    ];
    const newAssets: BrowserBuilderBaseOptions['assets'] = [
      { glob: '**/*', input: 'public' },
    ];

    context.logger.info(
      `  ↳ Removing "assets" configuration for ${oldAssets
        .map((x) => `"${x}"`)
        .join(', ')}`
    );
    context.logger.info(
      '  ↳ Adding "assets" configuration: `{ glob: "**/*", input: "public" }`'
    );

    if (Array.isArray(buildTarget.options?.assets)) {
      buildTarget.options.assets = buildTarget.options.assets.filter(
        (asset: string | object) => !oldAssets.includes(asset)
      );

      // Add the new public assets config
      buildTarget.options.assets = [
        ...newAssets,
        ...buildTarget.options.assets,
      ];
    } else {
      printErrorWithDocs(
        'Could not find "assets" array in "build" target configuration',
        context
      );
    }

    // Update config for "test" target
    if (Array.isArray(testTarget?.options?.assets)) {
      testTarget.options.assets = testTarget.options.assets.filter(
        (asset: string | object) => !oldAssets.includes(asset)
      );

      // Add the new public assets config
      testTarget.options.assets = [...newAssets, ...testTarget.options.assets];
    } else {
      printErrorWithDocs(
        'Could not find "assets" array in "test" target configuration',
        context
      );
    }

    const JSON_INDENT = 2;
    tree.overwrite(path, JSON.stringify(workspace, null, JSON_INDENT));
    context.logger.info('✅ Updated angular.json assets configuration');
  };
}
