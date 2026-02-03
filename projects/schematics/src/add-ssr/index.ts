/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { strings } from '@angular-devkit/core';
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  Tree,
  apply,
  branchAndMerge,
  chain,
  externalSchematic,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
import {
  getDecoratorMetadata,
  getMetadataField,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { RemoveChange } from '@schematics/angular/utility/change';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import ts from 'typescript';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import collectedDependencies from '../dependencies.json';
import {
  ANGULAR_CORE,
  getDefaultProjectNameFromWorkspace,
  getWorkspace,
} from '../shared';
import { ANGULAR_SERVER_MODULE, ANGULAR_SSR } from '../shared/constants';
import { SPARTACUS_SETUP } from '../shared/libs-constants';
import {
  commitChanges,
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
  removeImport,
} from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '../shared/utils/html-utils';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../shared/utils/lib-utils';
import { addToModuleProviders } from '../shared/utils/module-file-utils';
import {
  getPrefixedSpartacusSchematicsVersion,
  readPackageJson,
} from '../shared/utils/package-utils';

const DEPENDENCY_NAMES: string[] = ['@angular/platform-server', ANGULAR_SSR];

export function modifyAppServerModuleFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      ANGULAR_SERVER_MODULE,
      '/src'
    )[0];

    if (!appServerModulePath) {
      throw new SchematicsException(
        `Project file "app.module.server.ts" not found.`
      );
    }

    const importChange = insertImport(
      getTsSourceFile(tree, appServerModulePath),
      appServerModulePath,
      `provideServer`,
      `@spartacus/setup/ssr`,
      false
    );
    const providerChanges = addToModuleProviders(
      tree,
      appServerModulePath,
      `
     ...provideServer({
        serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
      }),`
    );
    const changes = [importChange, ...providerChanges];
    commitChanges(tree, appServerModulePath, changes);

    context.logger.log('info', `✅️ Modified app.module.server.ts file.`);
    return tree;
  };
}

function modifyIndexHtmlFile(options: SpartacusOptions): Rule {
  return (tree: Tree) => {
    const buffer = tree.read('src/index.html');
    if (buffer) {
      const indexContent = buffer.toString();
      if (!indexContent.includes('<meta name="occ-backend-base-url"')) {
        const projectIndexHtmlPath = getIndexHtmlPath(tree);
        const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';
        const metaTags = [
          `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
        ];

        metaTags.forEach((metaTag) => {
          appendHtmlElementToHead(tree, projectIndexHtmlPath, metaTag);
        });
      }
    }
    return tree;
  };
}

function provideServerFile(options: SpartacusOptions): Source {
  return apply(url('./files'), [
    template({
      ...strings,
      ...(options as object),
      typescriptExt: 'ts',
      browserDistDirectory: `dist/${options.project}/browser`,
    }),
    move('./src'),
  ]);
}

function prepareDependencies(): NodeDependency[] {
  const spartacusVersion = getPrefixedSpartacusSchematicsVersion();

  const spartacusDependencies: NodeDependency[] = [];
  spartacusDependencies.push({
    type: NodeDependencyType.Default,
    version: spartacusVersion,
    name: SPARTACUS_SETUP,
  });

  const thirdPartyDependencies: NodeDependency[] = [];
  for (const dependencyName of DEPENDENCY_NAMES) {
    thirdPartyDependencies.push({
      type: NodeDependencyType.Default,
      version: (collectedDependencies.storefrontapp as Record<string, string>)[
        dependencyName
      ],
      name: dependencyName,
    });
  }

  return spartacusDependencies.concat(thirdPartyDependencies);
}

/**
 * Adds `build:ssr` script to `package.json` as it's required for CCv2 build - process fails when script is missing.
 *
 * TODO: CXSPA-6466 Can be removed if Model T adjust their build process to not require this script.
 */
function addBuildSsrScript(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (spartacusOptions.debug) {
      context.logger.info(
        `⌛️ Adding "build:ssr" script to "package.json"... (CCv2 purposes)`
      );
    }
    const pkgPath = '/package.json';
    const pkg = tree.readJson(pkgPath) as {
      scripts?: Record<string, string>;
    } | null;
    if (pkg === null) {
      throw new SchematicsException('Could not find package.json');
    }
    pkg.scripts = {
      ...pkg.scripts,
      'build:ssr': 'ng build',
    };

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
  };
}

/**
 * Fixes the configuration for SSR and Prerendering to be able to work with Spartacus.
 */
function disableSsrAndPrerenderingInAngularJson(
  spartacusOptions: SpartacusOptions
): Rule {
  return chain([
    disablePrerenderingForNgBuild(spartacusOptions),
    addNoSsrConfigurationToNgBuild(spartacusOptions),
    useNoSsrConfigurationInNgServe(spartacusOptions),
  ]);
}

/**
 * In angular.json: set "prerender: false" in "options" of the "build" architect section
 */
function disablePrerenderingForNgBuild(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (spartacusOptions.debug) {
      context.logger.info(
        `⌛️ Disabling Prerendering by default for "ng build"...`
      );
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const options = build?.options;

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
                prerender: false,
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (spartacusOptions.debug) {
      context.logger.info(
        `✅ Disabling Prerendering by default for "ng build" complete.`
      );
    }
    return tree;
  };
}

/**
 * In angular.json: add new "configuration" section named "noSsr" to "build" architect section
 */
function addNoSsrConfigurationToNgBuild(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (spartacusOptions.debug) {
      context.logger.info(`⌛️ Adding "noSsr" configuration to "ng build"...`);
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const configurations = build?.configurations;

    const noSsrConfiguration = {
      ssr: false,
      prerender: false,
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
              ...build,
              configurations: {
                ...configurations,
                noSsr: noSsrConfiguration,
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (spartacusOptions.debug) {
      context.logger.info(
        `✅ Adding "noSsr" configuration to "ng build" complete.`
      );
    }
    return tree;
  };
}

/**
 * In angular.json: use "noSsr" configuration in "serve" architect section
 */
function useNoSsrConfigurationInNgServe(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (spartacusOptions.debug) {
      context.logger.info(`⌛️ Using "noSsr" configuration in "ng serve"...`);
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const serve = architect?.serve;
    const configurations = serve?.configurations;
    const production = configurations?.production;
    const development = configurations?.development;

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [projectName]: {
          ...project,
          architect: {
            ...architect,
            serve: {
              ...serve,
              configurations: {
                ...configurations,
                production: {
                  ...production,
                  buildTarget: `${production?.buildTarget},noSsr`,
                },
                development: {
                  ...development,
                  buildTarget: `${development?.buildTarget},noSsr`,
                },
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (spartacusOptions.debug) {
      context.logger.info(
        `✅ Using "noSsr" configuration in "ng serve" complete.`
      );
    }
    return tree;
  };
}

/**
 * Removes the "outputMode" option from the "build" target in angular.json.
 *
 * This could be removed when we migrate to new SSR API.
 */
function removeOutputModeSupportedOnlyInNewSsrApi(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (spartacusOptions.debug) {
      context.logger.info(
        `⌛️ Removing "outputMode" supported only in new SSR API...`
      );
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const options = build?.options;

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
                outputMode: undefined,
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (spartacusOptions.debug) {
      context.logger.info(`✅ Removed "outputMode" option`);
    }
    return tree;
  };
}

/**
 * Removes the `app.routes.server.ts` file.
 */
function removeServerRoutesFileFromSrc(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const serverRoutesPath = getPathResultsForFile(
      tree,
      'app.routes.server.ts',
      '/src'
    )[0];

    if (serverRoutesPath) {
      tree.delete(serverRoutesPath);
      if (spartacusOptions.debug) {
        context.logger.info(`✅ Deleted ${serverRoutesPath}`);
      }
    }

    return tree;
  };
}

/**
 * Removes the import for `serverRoutes` from './app.routes.server' in app.module.server.ts.
 */
function removeServerRoutesImport(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      ANGULAR_SERVER_MODULE,
      '/src'
    )[0];

    if (!appServerModulePath) {
      return tree;
    }

    const appServerModuleSource = getTsSourceFile(tree, appServerModulePath);

    if (
      isImported(appServerModuleSource, 'serverRoutes', './app.routes.server')
    ) {
      const serverRoutesImportRemoval = removeImport(appServerModuleSource, {
        className: 'serverRoutes',
        importPath: './app.routes.server',
      });
      commitChanges(tree, appServerModulePath, [serverRoutesImportRemoval]);

      if (spartacusOptions.debug) {
        context.logger.info(
          `✅ Removed serverRoutes import from ${appServerModulePath}`
        );
      }
    }

    return tree;
  };
}

/**
 * Removes the @angular/ssr import from app.module.server.ts.
 */
function removeAngularSsrImport(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      ANGULAR_SERVER_MODULE,
      '/src'
    )[0];

    if (!appServerModulePath) {
      return tree;
    }

    const appServerModuleSource = getTsSourceFile(tree, appServerModulePath);

    const hasProvideServerRendering = isImported(
      appServerModuleSource,
      'provideServerRendering',
      ANGULAR_SSR
    );
    const hasWithRoutes = isImported(
      appServerModuleSource,
      'withRoutes',
      ANGULAR_SSR
    );

    if (hasProvideServerRendering && hasWithRoutes) {
      const angularSsrImportRemoval = removeImport(appServerModuleSource, {
        importPath: ANGULAR_SSR,
      });
      commitChanges(tree, appServerModulePath, [angularSsrImportRemoval]);

      if (spartacusOptions.debug) {
        context.logger.info(
          `✅ Removed @angular/ssr import from ${appServerModulePath}`
        );
      }
    }

    return tree;
  };
}

/**
 * Removes the provideServerRendering provider from app.module.server.ts.
 */
function removeProvideServerRenderingFromProviders(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      ANGULAR_SERVER_MODULE,
      '/src'
    )[0];

    if (!appServerModulePath) {
      return tree;
    }

    const appServerModuleSource = getTsSourceFile(tree, appServerModulePath);

    const ngModuleDecorator = getDecoratorMetadata(
      appServerModuleSource,
      'NgModule',
      ANGULAR_CORE
    )[0];

    if (ngModuleDecorator) {
      const providersAssignment = getMetadataField(
        ngModuleDecorator as ts.ObjectLiteralExpression,
        'providers'
      )[0] as ts.PropertyAssignment;

      if (providersAssignment) {
        const providersArray =
          providersAssignment.initializer as ts.ArrayLiteralExpression;

        const providerToRemove = providersArray.elements.find((element) =>
          element.getText().includes('provideServerRendering')
        );

        if (providerToRemove) {
          const removeProviderChange = new RemoveChange(
            appServerModulePath,
            providerToRemove.getStart(),
            providerToRemove.getFullText()
          );
          commitChanges(tree, appServerModulePath, [removeProviderChange]);

          if (spartacusOptions.debug) {
            context.logger.info(
              `✅ Removed provideServerRendering(withRoutes(serverRoutes)) from ${appServerModulePath}`
            );
          }
        }
      }
    }

    return tree;
  };
}

/**
 * Removes the `app.routes.server.ts` file and related code from the app.module.server.ts file.
 * This file is not supported by Spartacus SSR.
 */
function removeServerRoutesFile(spartacusOptions: SpartacusOptions): Rule {
  return chain([
    removeServerRoutesFileFromSrc(spartacusOptions),
    removeServerRoutesImport(spartacusOptions),
    removeAngularSsrImport(spartacusOptions),
    removeProvideServerRenderingFromProviders(spartacusOptions),
  ]);
}

/**
 * Http Transfer Cache is temporarily disabled; https://jira.tools.sap/browse/CXSPA-10430
 */
export function addWithNoHttpTransferCacheToAppModule(
  spartacusOptions: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModulePath = getPathResultsForFile(
      tree,
      'app.module.ts',
      '/src'
    )[0];
    if (!appModulePath) {
      throw new SchematicsException(
        `AppModule file "app.module.ts" not found.`
      );
    }

    const source = getTsSourceFile(tree, appModulePath);

    const importChange = insertImport(
      source,
      appModulePath,
      'withNoHttpTransferCache',
      '@angular/platform-browser'
    );

    const fileBuffer = tree.read(appModulePath);
    if (!fileBuffer) {
      throw new SchematicsException(`Could not read file at ${appModulePath}`);
    }
    const fileContent = fileBuffer.toString();

    // Regex to match provideClientHydration(...) with any arguments
    const hydrationRegex = /provideClientHydration\s*\(\s*([^)]*)\)/m;
    const match = hydrationRegex.exec(fileContent);

    if (match) {
      const args = match[1].trim();

      const argList = args
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      const idx = argList.findIndex((a) => a.startsWith('withEventReplay'));
      if (idx !== -1) {
        argList[idx] = 'withEventReplay()';
        argList.splice(idx + 1, 0, 'withNoHttpTransferCache()');
      } else {
        argList.push('withNoHttpTransferCache()');
      }
      const newArgs = argList.join(', ');

      const updatedContent = fileContent.replace(
        hydrationRegex,
        (_, _args) => `provideClientHydration(${newArgs}`
      );
      tree.overwrite(appModulePath, updatedContent);
      if (spartacusOptions.debug) {
        context.logger.info(
          '✅ Added withNoHttpTransferCache() next to withEventReplay() in the parameter list of provideClientHydration'
        );
      }
    }
    commitChanges(tree, appModulePath, [importChange]);
    return tree;
  };
}

export function addSSR(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const serverTemplate = provideServerFile(options);
    const packageJson = readPackageJson(tree);

    return chain([
      addPackageJsonDependencies(prepareDependencies(), packageJson),
      externalSchematic(ANGULAR_SSR, 'ng-add', {
        project: options.project,
      }),
      removeOutputModeSupportedOnlyInNewSsrApi(options),
      removeServerRoutesFile(options),
      addBuildSsrScript(options),
      modifyAppServerModuleFile(),
      modifyIndexHtmlFile(options),
      addWithNoHttpTransferCacheToAppModule(options),
      branchAndMerge(
        chain([mergeWith(serverTemplate, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),

      disableSsrAndPrerenderingInAngularJson(options),

      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
