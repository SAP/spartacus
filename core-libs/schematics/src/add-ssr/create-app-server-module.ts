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
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { ANGULAR_SERVER_MODULE, APP_COMPONENT } from '../shared/constants';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/**
 * Creates app.module.server.ts file if it doesn't exist (for SSR standalone apps).
 */
export function createAppServerModule(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Checking if ${ANGULAR_SERVER_MODULE} needs to be created...`
      );
    }

    const project = options.project;
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // Check if app.module.server.ts already exists
    const appServerModuleExists = appSourceFiles.some((sourceFile) =>
      sourceFile.getFilePath().includes(ANGULAR_SERVER_MODULE)
    );

    if (!appServerModuleExists) {
      context.logger.info(
        `✏️ Creating app.module.server.ts for SSR standalone application...`
      );

      // Find the app directory
      let appDir: string | null = null;
      tree.visit((filePath: Path) => {
        if (filePath.endsWith(`/${APP_COMPONENT}`)) {
          appDir = filePath.substring(0, filePath.lastIndexOf('/'));
        }
      });

      if (!appDir) {
        throw new SchematicsException('Could not find app directory');
      }

      const appServerModulePath = `${appDir}/${ANGULAR_SERVER_MODULE}`;
      const appServerModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({})
export class AppServerModule {}
`;

      tree.create(appServerModulePath, appServerModuleContent);
      context.logger.info(`✅ Created ${appServerModulePath}`);
    } else {
      context.logger.info(`✅ ${ANGULAR_SERVER_MODULE} already exists`);
    }

    if (options.debug) {
      context.logger.info(`✅ App server module check complete.`);
    }

    return tree;
  };
}
