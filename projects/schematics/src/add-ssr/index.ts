/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
} from '@schematics/angular/utility/ast-utils';
import { RemoveChange } from '@schematics/angular/utility/change';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import ts from 'typescript';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import collectedDependencies from '../dependencies.json';
import { getDefaultProjectNameFromWorkspace, getWorkspace } from '../shared';
import {
  ANGULAR_CORE,
  ANGULAR_PLATFORM_BROWSER,
  ANGULAR_SSR,
} from '../shared/constants';
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

// Fix typing bug in @schematics/angular/utility/workspace-models since v17:
declare module '@schematics/angular/utility/workspace-models' {
  interface ServeBuilderOptions {
    /**
     * Since ng17 it's no more "browserTarget" but "buildTarget" property
     */
    buildTarget: string;
  }
}

const DEPENDENCY_NAMES: string[] = [
  '@angular/platform-server',
  ANGULAR_SSR,
  'ts-loader',
];

export function modifyAppServerModuleFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      'app.module.server.ts',
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

    context.logger.log('info', `✅️ Modified app.server.module.ts file.`);
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
    move('.'),
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
 * Removes the "provideClientHydration" from "app.module.ts" file.
 *
 * This rule should be skipped (and removed) when Spartacus starts supporting client hydration.
 */
function removeClientHydration(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (spartacusOptions.debug) {
      context.logger.info(
        `⌛️ Removing "provideClientHydration" from "app.module.ts"...`
      );
    }
    const appModulePath = getPathResultsForFile(
      tree,
      'app.module.ts',
      '/src'
    )[0];

    if (!appModulePath) {
      throw new SchematicsException(`Project file "app.module.ts" not found.`);
    }

    const sourceFile = getTsSourceFile(tree, appModulePath);

    // Remove import
    const importChange = removeImport(sourceFile, {
      className: `provideClientHydration`,
      importPath: ANGULAR_PLATFORM_BROWSER,
    });

    // Remove provider
    const providerChanges = removeFromModuleProviders(
      sourceFile,
      `provideClientHydration()`
    );

    const changes = [importChange, ...providerChanges];
    commitChanges(tree, appModulePath, changes);

    if (spartacusOptions.debug) {
      context.logger.info(
        `✅ Removing "provideClientHydration" from "app.module.ts" complete.`
      );
    }
    return tree;
  };
}

/**
 * Removes provider from  module providers.
 *
 * removeClientHydration() function is the only place where this function is used and it's used temporarily.
 * If needed, move this function to module-file-utils.ts
 */
function removeFromModuleProviders(
  source: ts.SourceFile,
  providerName: string
): RemoveChange[] {
  const nodes = getDecoratorMetadata(source, 'NgModule', ANGULAR_CORE);
  const node = nodes[0];
  if (!node || !ts.isObjectLiteralExpression(node)) {
    return [];
  }

  // Find the matching metadata field.
  const matchingProperties = getMetadataField(node, `providers`);
  const assignment = matchingProperties[0];

  // return empty array if assignment is not an array
  if (
    !ts.isPropertyAssignment(assignment) ||
    !ts.isArrayLiteralExpression(assignment.initializer)
  ) {
    return [];
  }

  //find provider to remove
  const providersExpression = assignment.initializer;
  const providerToRemove = providersExpression
    .getChildren()
    .filter((e) => e.getText().includes(providerName));

  if (!providerToRemove) {
    return [];
  }

  return [
    new RemoveChange(
      source.fileName,
      providerToRemove[0].pos,
      `${providerToRemove[0].getFullText()}`
    ),
  ];
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
      modifyAppServerModuleFile(),
      removeClientHydration(options),
      modifyIndexHtmlFile(options),
      branchAndMerge(
        chain([mergeWith(serverTemplate, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),

      disableSsrAndPrerenderingInAngularJson(options),

      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
