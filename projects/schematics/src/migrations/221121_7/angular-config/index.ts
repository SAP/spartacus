/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  getDefaultProjectNameFromWorkspace,
  getWorkspace,
} from '../../../shared/utils/workspace-utils';

/**
 * Removes the obsolete `index` property from angular.json build configuration.
 *
 * The `index` property is no longer needed in Angular 20+ with the application builder.
 * This migration removes it from the build options to clean up the configuration.
 * For more, see: https://github.com/angular/angular-cli/commit/901ab60d9f63fcff17213dbf7fe17e4a46835974
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    context.logger.info(
      '\n⌛️ Removing obsolete "index" property from angular.json...'
    );

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const options = build?.options;

    // To avoid introducing to the @spartacus/schematics a new library `@angular-devkit/build-angular` where the `BrowserBuilderOptions` is located,
    //`as any` was used to satisfy TS compiler.
    if (!(options as any)?.index) {
      context.logger.info('  ↳ No "index" property found to remove');
      return tree;
    }

    context.logger.info('  ↳ Removing "index" property from build options');

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [projectName]: {
          ...project,
          architect: {
            ...architect,
            build: {
              ...build,
              options: {
                ...options,
                index: undefined,
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    context.logger.info(
      '✅ Removed obsolete "index" property from angular.json'
    );

    return tree;
  };
}
