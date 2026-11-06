/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '../../shared/utils/workspace-utils';

/**
 * Updates angular.json to remove standalone: false from schematics configuration:
 * - Removes standalone: false from @schematics/angular:component
 * - Removes standalone: false from @schematics/angular:directive
 * - Removes standalone: false from @schematics/angular:pipe
 */
export function updateAngularJson(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('⏳ Updating angular.json...');

    const { workspace, path } = getWorkspace(tree);

    // Update schematics configuration at root level
    if ((workspace as any).schematics) {
      removeStandaloneFalse((workspace as any).schematics);
    }

    // Update schematics configuration in each project
    if (workspace.projects) {
      for (const projectName of Object.keys(workspace.projects)) {
        const project = workspace.projects[projectName];
        if ((project as any).schematics) {
          removeStandaloneFalse((project as any).schematics);
        }
      }
    }

    tree.overwrite(path, JSON.stringify(workspace, null, 2));

    context.logger.info('✅ Updated angular.json');

    return tree;
  };
}

/**
 * Removes standalone: false from component, directive, and pipe schematics
 */
function removeStandaloneFalse(schematics: any): void {
  const schematicsToUpdate = [
    '@schematics/angular:component',
    '@schematics/angular:directive',
    '@schematics/angular:pipe',
  ];

  for (const schematicName of schematicsToUpdate) {
    if (schematics[schematicName]) {
      delete schematics[schematicName].standalone;
    }
  }
}
