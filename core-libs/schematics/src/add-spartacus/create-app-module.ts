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
import { APP_COMPONENT, APP_MODULE } from '../shared/constants';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusOptions } from './schema';

/**
 * Creates app.module.ts file if it doesn't exist (for standalone apps).
 */
export function createAppModule(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Checking if ${APP_MODULE} needs to be created...`
      );
    }

    const project = options.project;
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // Check if app.module.ts already exists
    const appModuleExists = appSourceFiles.some((sourceFile) =>
      sourceFile.getFilePath().includes(APP_MODULE)
    );

    if (!appModuleExists) {
      if (options.debug) {
        context.logger.info(
          `✏️ Creating app.module.ts for standalone application...`
        );
      }

      // Find the app directory
      let appDir: string | null = null;
      tree.visit((filePath: Path) => {
        if (filePath.endsWith(`/app/${APP_COMPONENT}`)) {
          appDir = filePath.substring(0, filePath.lastIndexOf('/'));
        }
      });

      if (!appDir) {
        throw new SchematicsException('Could not find app directory');
      }

      const appModulePath = `${appDir}/${APP_MODULE}`;
      const appModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({})
export class AppModule {}
`;

      tree.create(appModulePath, appModuleContent);
      if (options.debug) {
        context.logger.info(`✅ Created ${appModulePath}`);
      }
    } else if (options.debug) {
      context.logger.info(`✅ ${APP_MODULE} already exists`);
    }

    if (options.debug) {
      context.logger.info(`✅ App module check complete.`);
    }

    return tree;
  };
}
