/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Path } from '@angular-devkit/core';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { SourceFile } from 'ts-morph';
import {
  ANGULAR_HTTP,
  APP_ROUTING_MODULE,
  APP_ROUTING_MODULE_LOCAL_FILENAME,
  APP_ROUTING_MODULE_LOCAL_PATH,
  RXJS,
} from '../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../shared/libs-constants';
import {
  analyzeCrossFeatureDependencies,
  analyzeCrossLibraryDependenciesByFeatures,
} from '../shared/utils/dependency-utils';
import { addFeatures, analyzeApplication } from '../shared/utils/feature-utils';
import { getIndexHtmlPath } from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '../shared/utils/html-utils';
import {
  addPackageJsonDependencies,
  finalizeInstallation,
  installPackageJsonDependencies,
} from '../shared/utils/lib-utils';
import {
  addModuleImport,
  addModuleProvider,
  removeModuleImport,
} from '../shared/utils/new-module-utils';
import {
  getPrefixedSpartacusSchematicsVersion,
  getSpartacusCurrentFeatureLevel,
  mapPackageToNodeDependencies,
  prepare3rdPartyDependencies,
  prepareSpartacusDependencies,
  readPackageJson,
  updatePackageJsonDependencies,
} from '../shared/utils/package-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  getRelativeStyleConfigImportPath,
  getStylesConfigFilePath,
} from '../shared/utils/styling-utils';
import {
  getDefaultProjectNameFromWorkspace,
  getProjectFromWorkspace,
  getProjectTargets,
  getWorkspace,
  scaffoldStructure,
} from '../shared/utils/workspace-utils';
import { addSpartacusConfiguration } from './configuration';
import { Schema as SpartacusOptions } from './schema';
import { setupSpartacusModule } from './spartacus';
import { setupSpartacusFeaturesModule } from './spartacus-features';
import { setupStoreModules } from './store';

function createStylesConfig(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const project = getProjectFromWorkspace(tree, options);
    const styleConfigFilePath = getStylesConfigFilePath(project.sourceRoot);
    const styleConfigContent = `$styleVersion: ${
      options.featureLevel || getSpartacusCurrentFeatureLevel()
    }`;
    if (tree.exists(styleConfigFilePath)) {
      context.logger.warn(
        `Skipping styles config file creation. File ${styleConfigFilePath} already exists.`
      );
    } else {
      tree.create(styleConfigFilePath, styleConfigContent);
    }
    return tree;
  };
}

export function getMainStyleFilePath(project: WorkspaceProject): string {
  const rootStyles = getProjectTargets(project)?.build?.options?.styles?.[0];
  const styleFilePath =
    typeof rootStyles === 'object'
      ? ((rootStyles as any)?.input as string)
      : rootStyles;
  if (!styleFilePath) {
    throw new Error(
      `Could not find main styling file from the project's angular configuration.`
    );
  }
  return styleFilePath;
}

function installStyles(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    if (options.debug) {
      context.logger.info(`⌛️ Installing styles...`);
    }
    const project = getProjectFromWorkspace(tree, options);
    const styleFilePath = getMainStyleFilePath(project);

    if (!styleFilePath) {
      context.logger.warn(
        `Could not find the default style file for this project.`
      );
      context.logger.warn(
        `Please consider manually setting up spartacus styles`
      );
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      context.logger.warn(
        `Could not find the default SCSS style file for this project. `
      );
      context.logger.warn(
        `Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.`
      );
      return;
    }

    const buffer = tree.read(styleFilePath);

    if (!buffer) {
      context.logger.warn(
        `Could not read the default style file within the project ${styleFilePath}`
      );
      context.logger.warn(
        `Please consider manually importing spartacus styles.`
      );
      return;
    }

    const htmlContent = buffer.toString();
    const relativeStyleConfigImportPath = getRelativeStyleConfigImportPath(
      project,
      styleFilePath
    );
    let insertion =
      `\n@import '${relativeStyleConfigImportPath}';\n` +
      `@import '@spartacus/styles/index';\n`;

    if (options?.theme) {
      insertion += `\n@import '@spartacus/styles/scss/theme/${options.theme}';\n`;
    }

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = tree.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    tree.commitUpdate(recorder);

    if (options.debug) {
      context.logger.info(`✅ Style installation complete.`);
    }
  };
}

function updateMainComponent(
  project: WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree, context: SchematicContext): Tree | void => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating main component...`);
    }

    const filePath = project.sourceRoot + '/app/app.component.html';
    const buffer = host.read(filePath);

    if (!buffer) {
      context.logger.warn(`Could not read app.component.html file.`);
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = `<cx-storefront></cx-storefront>\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(filePath);

    if (options && options.overwriteAppComponent) {
      recorder.remove(0, htmlContent.length);
      recorder.insertLeft(0, insertion);
    } else {
      recorder.insertLeft(htmlContent.length, `\n${insertion}`);
    }

    host.commitUpdate(recorder);

    if (options.debug) {
      context.logger.info(`✅ Main component update complete.`);
    }
    return host;
  };
}

function updateIndexFile(tree: Tree, options: SpartacusOptions): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating index file...`);
    }

    const projectIndexHtmlPath = getIndexHtmlPath(tree);
    const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';

    const metaTags = [
      `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
      `<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />`,
    ];

    metaTags.forEach((metaTag) => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    if (options.debug) {
      context.logger.info(`✅ Index file update complete`);
    }
    return host;
  };
}

function increaseBudgets(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Increasing budgets...`);
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const configurations = build?.configurations;
    const productionConfiguration = configurations?.production;
    const productionBudgets = (
      ((productionConfiguration as any).budgets ?? []) as {
        type: string;
        maximumError: string;
      }[]
    ).map((budget) => {
      if (budget.type === 'initial') {
        return {
          ...budget,
          maximumError: '3.5mb',
        };
      }
      return budget;
    });

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
              configurations: {
                ...configurations,
                production: {
                  ...productionConfiguration,
                  budgets: productionBudgets,
                },
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (options.debug) {
      context.logger.info(`✅ Budget increase complete.`);
    }
    return tree;
  };
}

/**
 * Checks if the app has an app configuration file and uses standalone components by default.
 *
 * @param options - The Spartacus options.
 * @returns A Rule function that checks if the app has an app configuration file.
 */
function verifyAppModuleExists(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Checking if the file "app.module.ts" exists...`);
    }

    // get tsconfig file paths
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    // get project structure based on current path and path of the first found tsconfig file
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // check if app module exists
    const appModule = appSourceFiles.find((sourceFile) =>
      sourceFile.getFilePath().includes(`app.module.ts`)
    );

    if (!appModule) {
      throw new SchematicsException(
        `File "app.module.ts" not found. Please re-create your application:
1. remove your application code
2. make sure to pass the flag "--standalone=false" to the command "ng new". For more, see https://angular.io/cli/new#options
3. try again installing Spartacus with a command "ng add @spartacus/schematics" ...
        
Note: Since version 17, Angular's command "ng new" by default creates an app without a file "app.module.ts" (in a so-called "standalone" mode). But Spartacus installer requires this file to be present.
`
      );
    }
    if (options.debug) {
      context.logger.info(`✅ App does not use standalone components.`);
    }
    return tree;
  };
}

export function createStylePreprocessorOptions(
  options?: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options?.debug) {
      context.logger.info(`⌛️ Updating style preprocessor...`);
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const project = angularJson.projects[projectName];
    const architect = project.architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildStylePreprocessorOptions = createStylePreprocessorOptionsArray(
      (architectBuild?.options as any)?.stylePreprocessorOptions
    );
    const buildOptions = {
      ...architectBuild?.options,
      stylePreprocessorOptions: buildStylePreprocessorOptions,
    };

    // `test` architect section
    const architectTest = architect?.test;
    const testStylePreprocessorOptions = createStylePreprocessorOptionsArray(
      (architectBuild?.options as any)?.stylePreprocessorOptions
    );
    const testOptions = {
      ...architectTest?.options,
      stylePreprocessorOptions: testStylePreprocessorOptions,
    };

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [projectName]: {
          ...project,
          architect: {
            ...architect,
            build: {
              ...architectBuild,
              options: buildOptions,
            },
            test: {
              ...architectTest,
              options: testOptions,
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
    if (options?.debug) {
      context.logger.info(`✅ Style preprocessor update complete.`);
    }
    return tree;
  };
}

function createStylePreprocessorOptionsArray(angularJsonStylePreprocessorOptions: {
  includePaths: string[];
}): { includePaths: string[] } {
  const NODE_MODULES_PATH = 'node_modules/';
  if (!angularJsonStylePreprocessorOptions) {
    angularJsonStylePreprocessorOptions = {
      includePaths: [NODE_MODULES_PATH],
    };
  } else {
    if (!angularJsonStylePreprocessorOptions.includePaths) {
      angularJsonStylePreprocessorOptions.includePaths = [NODE_MODULES_PATH];
    } else {
      if (
        !angularJsonStylePreprocessorOptions.includePaths.includes(
          NODE_MODULES_PATH
        )
      ) {
        angularJsonStylePreprocessorOptions.includePaths.push(
          NODE_MODULES_PATH
        );
      }
    }
  }

  return angularJsonStylePreprocessorOptions;
}

function prepareDependencies(features: string[]): NodeDependency[] {
  const spartacusDependencies = prepareSpartacusDependencies();

  const libraries = analyzeCrossLibraryDependenciesByFeatures(features);
  const spartacusVersion = getPrefixedSpartacusSchematicsVersion();
  const spartacusLibraryDependencies = libraries.map((library) =>
    mapPackageToNodeDependencies(library, spartacusVersion)
  );

  const dependencies: NodeDependency[] = spartacusDependencies
    .concat(spartacusLibraryDependencies)
    .concat(prepare3rdPartyDependencies());

  return dependencies;
}

function updateAppModule(options: SpartacusOptions): Rule {
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
        if (sourceFile.getFilePath().includes(`app.module.ts`)) {
          addModuleProvider(sourceFile, {
            import: {
              moduleSpecifier: ANGULAR_HTTP,
              namedImports: [
                'provideHttpClient',
                'withFetch',
                'withInterceptorsFromDi',
              ],
            },
            content: 'provideHttpClient(withFetch(), withInterceptorsFromDi())',
          });

          addAppRoutingModuleImport(tree, context, sourceFile);

          saveAndFormat(sourceFile);
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
  sourceFile: SourceFile
) {
  context.logger.info(
    `⌛️ Removing from AppModule's imports array a local AppRoutingModule, if exists`
  );
  // remove import of AppRoutingModule (NgModule import and module path import), if exists
  const removedImport = removeModuleImport(sourceFile, {
    importPath: APP_ROUTING_MODULE_LOCAL_PATH,
    content: APP_ROUTING_MODULE,
  });
  context.logger.info(
    removedImport
      ? `✅ Removed from AppModule's imports array a local AppRoutingModule`
      : `✅ No local AppRoutingModule found im AppModule's imports array`
  );

  context.logger.info(
    `⌛️ Deleting a local file "${APP_ROUTING_MODULE_LOCAL_FILENAME}", if exists`
  );
  // delete local file of AppRoutingModule, if exists
  let deletedFile: Path | undefined;
  tree.visit((filePath: Path) => {
    if (filePath.endsWith(APP_ROUTING_MODULE_LOCAL_FILENAME)) {
      tree.delete(filePath);
      context.logger.info(`✅ Deleted a local file: ${filePath}`);
      deletedFile = filePath;
    }
  });
  if (!deletedFile) {
    context.logger.info(
      `✅ No local file found with the path "${APP_ROUTING_MODULE_LOCAL_FILENAME}"`
    );
  }

  context.logger.info(
    `⌛️ Importing AppRoutingModule of Spartacus in AppModule`
  );
  // add import of AppRoutingModule from Spartacus
  addModuleImport(sourceFile, {
    order: 2,
    import: {
      moduleSpecifier: SPARTACUS_STOREFRONTLIB,
      namedImports: [APP_ROUTING_MODULE],
    },
    content: APP_ROUTING_MODULE,
  });
  context.logger.info(`✅ Imported AppRoutingModule of Spartacus in AppModule`);
}

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const features = analyzeCrossFeatureDependencies(options.features ?? []);
    const dependencies = prepareDependencies(features);
    const spartacusRxjsDependency: NodeDependency[] = [
      dependencies.find((dep) => dep.name === RXJS) as NodeDependency,
    ];
    const packageJsonFile = readPackageJson(tree);
    return chain([
      verifyAppModuleExists(options),

      analyzeApplication(options, features),

      setupStoreModules(options),

      scaffoldStructure(options),

      setupSpartacusModule(options),

      setupSpartacusFeaturesModule(options),

      addSpartacusConfiguration(options),

      updateAppModule(options),
      createStylesConfig(options),
      installStyles(options),
      updateMainComponent(getProjectFromWorkspace(tree, options), options),
      options.useMetaTags ? updateIndexFile(tree, options) : noop(),

      increaseBudgets(options),
      createStylePreprocessorOptions(options),

      addFeatures(options, features),

      chain([
        addPackageJsonDependencies(
          prepareDependencies(features),
          packageJsonFile
        ),
        /**
         * Force installing versions of dependencies used by Spartacus.
         * E.g. ng13 uses rxjs 7, but Spartacus uses rxjs 6.
         */
        updatePackageJsonDependencies(spartacusRxjsDependency, packageJsonFile),
        installPackageJsonDependencies(),
      ]),

      finalizeInstallation(options, features),
    ])(tree, context);
  };
}
