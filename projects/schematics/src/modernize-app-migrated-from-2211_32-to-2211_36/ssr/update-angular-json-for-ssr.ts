/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '../../shared/utils/workspace-utils';
import { printErrorWithDocsForMigrated_2211_32_To_2211_36 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Updates the Angular configuration related to SSR for new Angular v19 standards.
 *
 * It updates the "ssr.entry" path in the "build" target,
 * to use the new path with the `src/server.ts` file,
 * instead of `server.ts`.
 */
export function updateAngularJsonForSsr(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('\n⏳ Updating angular.json for SSR...');

    const { workspace, path } = getWorkspace(tree);
    const project = workspace.projects[Object.keys(workspace.projects)[0]];

    if (!project) {
      printErrorWithDocs('No project found in workspace', context);
      return;
    }

    const buildTarget = project.architect?.build as any;
    if (!buildTarget) {
      printErrorWithDocs(
        'No build target found in project configuration',
        context
      );
      return;
    }

    const oldEntryPath = buildTarget.options.ssr.entry;
    const newEntryPath = 'src/server.ts';
    context.logger.info(
      `  ↳ Updating "ssr.entry" path in build target from "${oldEntryPath}" to "${newEntryPath}"`
    );
    if (buildTarget.options?.ssr?.entry) {
      buildTarget.options.ssr.entry = newEntryPath;
    } else {
      printErrorWithDocs('No "ssr.entry" path found in build target', context);
      return;
    }

    const JSON_INDENT = 2;
    tree.overwrite(path, JSON.stringify(workspace, null, JSON_INDENT));
    context.logger.info('✅ Updated angular.json for SSR');
  };
}
