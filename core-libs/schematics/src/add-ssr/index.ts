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
  noop,
  template,
  url,
} from '@angular-devkit/schematics';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { updateAppConfigServer as updateAppConfigServerForRuntimeConfig } from '../add-runtime-config/update-app-config-server';
import { updateServerTs } from '../add-runtime-config/update-server-ts';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import collectedDependencies from '../dependencies.json';
import { getDefaultProjectNameFromWorkspace, getWorkspace } from '../shared';
import {
  ANGULAR_SERVER_MODULE,
  ANGULAR_SSR,
  APP_ROUTES_SERVER,
  INDEX_HTML,
} from '../shared/constants';
import { SPARTACUS_SETUP } from '../shared/libs-constants';
import {
  commitChanges,
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
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
import { createAppServerModule } from './create-app-server-module';
import { updateAppConfigInSsr } from './update-app-config-in-ssr';
import { updateAppConfigServer } from './update-app-config-server';

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
        `Project file "${ANGULAR_SERVER_MODULE}" not found.`
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
    const buffer = tree.read(`src/${INDEX_HTML}`);
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
function addServeSSRDevScript(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (spartacusOptions.debug) {
      context.logger.info(
        `⌛️ Adding "serve:ssr:dev" script to "package.json"...`
      );
    }
    const pkgPath = '/package.json';
    const pkg = tree.readJson(pkgPath) as {
      scripts?: Record<string, string>;
    } | null;
    if (pkg === null) {
      throw new SchematicsException('Could not find package.json');
    }
    if (pkg.scripts?.['serve:ssr:dev']) {
      return; // already present — skip silently
    }
    const serveScript = pkg.scripts?.['serve:ssr'];
    // Prefix the existing serve:ssr script with dev env vars:
    //   CONFIG_URL=file://${PWD}/config.json — reads config.json from disk per render.
    //   NODE_TLS_REJECT_UNAUTHORIZED=0 — skips TLS verification for OCC backends that use
    //     self-signed certificates in local/demo environments. Remove this before going to
    //     production or when connecting to a backend with a valid certificate chain.
    // ${PWD} is a POSIX shell variable expanded at runtime — always the correct absolute
    // path regardless of who runs it or where the repo lives (no machine-specific path baked in).
    const devScript = serveScript
      ? `NODE_TLS_REJECT_UNAUTHORIZED=0 CONFIG_URL=file://\${PWD}/config.json ${serveScript}`
      : `NODE_TLS_REJECT_UNAUTHORIZED=0 CONFIG_URL=file://\${PWD}/config.json node dist/${spartacusOptions.project}/server/server.mjs`;

    pkg.scripts = {
      ...pkg.scripts,
      'serve:ssr:dev': devScript,
    };

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
  };
}

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
 * That file is not supported by Spartacus SSR.
 */
function removeServerRoutesFile(spartacusOptions: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const serverRoutesPath = getPathResultsForFile(
      tree,
      APP_ROUTES_SERVER,
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
      createAppServerModule(options),
      updateAppConfigServer(options),
      modifyAppServerModuleFile(),
      modifyIndexHtmlFile(options),
      updateAppConfigInSsr(options),
      branchAndMerge(
        chain([mergeWith(serverTemplate, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),
      options.runtimeConfig ? updateServerTs(options) : noop(),
      options.runtimeConfig
        ? updateAppConfigServerForRuntimeConfig(options)
        : noop(),
      options.runtimeConfig ? addServeSSRDevScript(options) : noop(),
      options.runtimeConfig
        ? (_tree: Tree, _ctx: SchematicContext) => {
            _ctx.logger.info(String.raw`
✅ SSR + runtime config wiring complete.

── Dev mode ─────────────────────────────────────────────────────────────────
Run the SSR server locally:

  npm run serve:ssr:dev

The "serve:ssr:dev" script sets:
  CONFIG_URL=file://${'$'}{PWD}/config.json   — reads config.json from disk on every render
  NODE_TLS_REJECT_UNAUTHORIZED=0          — skips TLS verification for self-signed OCC certs

NODE_TLS_REJECT_UNAUTHORIZED=0 is safe for local/demo environments only.
Remove it (or use "serve:ssr" directly) when connecting to a backend with a valid cert.

── Production mode ───────────────────────────────────────────────────────────
Use "serve:ssr" with CONFIG_URL pointing to the real config endpoint:

  CONFIG_URL=https://internal-caddy/config.json npm run serve:ssr

On SAP Commerce Cloud the hosting platform sets CONFIG_URL automatically —
no manual configuration required.

── Other environment variables ───────────────────────────────────────────────
  SERVER_REQUEST_ORIGIN — required by Spartacus SSR for local dev (e.g. http://localhost:4000)
  NG_ALLOWED_HOSTS      — restrict allowed hostnames (generated server.ts defaults to ['*'])
  CONFIG_FETCH_TIMEOUT_MS — HTTP fetch timeout in ms for getServerRuntimeEnvironment (default 5000)
`);
          }
        : noop(),

      disableSsrAndPrerenderingInAngularJson(options),

      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
