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
  chain,
} from '@angular-devkit/schematics';
import { addRootImport } from '@schematics/angular/utility';
import { Node, SourceFile } from 'ts-morph';
import { SPARTACUS_STOREFRONTLIB } from '../shared/libs-constants';
import { createImports } from '../shared/utils/import-utils';
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
        `⌛️ Checking if app.module.ts needs to be created...`
      );
    }

    const project = options.project;
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // Check if app.module.ts already exists
    const appModuleExists = appSourceFiles.some((sourceFile) =>
      sourceFile.getFilePath().includes('app.module.ts')
    );

    if (!appModuleExists) {
      context.logger.info(
        `✏️ Creating app.module.ts for standalone application...`
      );

      // Find the app directory
      let appDir: string | null = null;
      tree.visit((filePath: Path) => {
        if (filePath.endsWith('/app/app.component.ts')) {
          appDir = filePath.substring(0, filePath.lastIndexOf('/'));
        }
      });

      if (!appDir) {
        throw new SchematicsException('Could not find app directory');
      }

      const appModulePath = `${appDir}/app.module.ts`;
      const appModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({})
export class AppModule {}
`;

      tree.create(appModulePath, appModuleContent);
      context.logger.info(`✅ Created ${appModulePath}`);
    } else {
      context.logger.info(`✅ app.module.ts already exists`);
    }

    if (options.debug) {
      context.logger.info(`✅ App module check complete.`);
    }

    return tree;
  };
}

/**
 * Adds importProvidersFrom(AppModule) to app.config.ts.
 */
export function addAppModuleToAppConfig(options: SpartacusOptions): Rule {
  return (_tree: Tree, context: SchematicContext): Rule => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding importProvidersFrom(AppModule) to app.config.ts...`
      );
    }

    return chain([
      addRootImport(options.project ?? 'default', ({ code, external }) => {
        return code`${external('AppModule', './app.module')}`;
      }),
      () => {
        if (options.debug) {
          context.logger.info(
            `✅ Added importProvidersFrom(AppModule) to app.config.ts`
          );
        }
      },
    ]);
  };
}

/**
 * Adds StorefrontComponent to app.component.ts imports array.
 */
export function addStorefrontComponentToAppComponent(
  options: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding StorefrontComponent to app.component.ts imports...`
      );
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (sourceFile.getFilePath().includes('app.component.ts')) {
          // Add import for StorefrontComponent
          createImports(sourceFile, [
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: ['StorefrontComponent'],
            },
          ]);

          // Add StorefrontComponent to @Component imports array
          addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

          // Save changes to tree
          tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

          context.logger.info(
            `✅ Added StorefrontComponent to app.component.ts imports`
          );
          break;
        }
      }
    }

    if (options.debug) {
      context.logger.info(`✅ App component update complete.`);
    }

    return tree;
  };
}

/**
 * Creates app.module.server.ts file if it doesn't exist (for SSR standalone apps).
 */
export function createAppServerModule(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Checking if app.module.server.ts needs to be created...`
      );
    }

    const project = options.project;
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // Check if app.module.server.ts already exists
    const appServerModuleExists = appSourceFiles.some((sourceFile) =>
      sourceFile.getFilePath().includes('app.module.server.ts')
    );

    if (!appServerModuleExists) {
      context.logger.info(
        `✏️ Creating app.module.server.ts for SSR standalone application...`
      );

      // Find the app directory
      let appDir: string | null = null;
      tree.visit((filePath: Path) => {
        if (filePath.endsWith('/app/app.component.ts')) {
          appDir = filePath.substring(0, filePath.lastIndexOf('/'));
        }
      });

      if (!appDir) {
        throw new SchematicsException('Could not find app directory');
      }

      const appServerModulePath = `${appDir}/app.module.server.ts`;
      const appServerModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({})
export class AppServerModule {}
`;

      tree.create(appServerModulePath, appServerModuleContent);
      context.logger.info(`✅ Created ${appServerModulePath}`);
    } else {
      context.logger.info(`✅ app.module.server.ts already exists`);
    }

    if (options.debug) {
      context.logger.info(`✅ App server module check complete.`);
    }

    return tree;
  };
}

/**
 * Helper function to add a value to a Component decorator property.
 */
function addToComponentDecorator(
  sourceFile: SourceFile,
  propertyName: string,
  value: string
): void {
  const classes = sourceFile.getClasses();

  for (const classDeclaration of classes) {
    const decorator = classDeclaration.getDecorator('Component');

    if (decorator) {
      const args = decorator.getArguments();

      if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
        const objLiteral = args[0];
        const importsProperty = objLiteral
          .getProperties()
          .find(
            (prop) =>
              Node.isPropertyAssignment(prop) && prop.getName() === propertyName
          );

        if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
          const arrayLiteral = importsProperty.getInitializer();

          if (arrayLiteral && Node.isArrayLiteralExpression(arrayLiteral)) {
            const alreadyExists = arrayLiteral
              .getElements()
              .some((element) => element.getText() === value);

            if (!alreadyExists) {
              arrayLiteral.addElement(value);
            }
          }
        } else {
          // Add the property if it doesn't exist
          objLiteral.addPropertyAssignment({
            name: propertyName,
            initializer: `[${value}]`,
          });
        }
      }
    }
  }
}
