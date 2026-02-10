/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
import {
  APP_COMPONENT,
  APP_COMPONENT_HTML,
  APP_CONFIG,
  RXJS,
} from '../shared/constants';
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
  getPrefixedSpartacusSchematicsVersion,
  getSpartacusCurrentFeatureLevel,
  mapPackageToNodeDependencies,
  prepare3rdPartyDependencies,
  prepareSpartacusDependencies,
  readPackageJson,
  updatePackageJsonDependencies,
} from '../shared/utils/package-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  getRelativeStyleConfigImportPath,
  getStylesConfigFilePath,
} from '../shared/utils/styling-utils';
import {
  createSassSilenceDeprecations,
  getDefaultProjectNameFromWorkspace,
  getProjectFromWorkspace,
  getProjectTargets,
  getWorkspace,
  scaffoldStructure,
} from '../shared/utils/workspace-utils';
import { addStorefrontComponentToAppComponent } from './add-storefront-component-to-app-component';
import { addSpartacusConfiguration } from './configuration';
import { createAppModule } from './create-app-module';
import { Schema as SpartacusOptions } from './schema';
import { setupSpartacusModule } from './spartacus';
import { addFeatureToggles } from './spartacus-feature-toggles';
import { setupSpartacusFeaturesModule } from './spartacus-features';
import { setupStoreModules } from './store';
import { updateAppConfig } from './update-app-config';
import { updateAppModule } from './update-app-module';

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
      `@import '${relativeStyleConfigImportPath}';\n` +
      `\n// ORDER IMPORTANT: Spartacus core first\n` +
      `@import '@spartacus/styles/scss/core';\n\n` +
      `// ORDER IMPORTANT: Copy of Bootstrap files next\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/reboot';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/type';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/grid';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/utilities';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/transitions';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/dropdown';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/card';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/nav';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/buttons';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/forms';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/custom-forms';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/modal';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/close';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/alert';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/tooltip';\n\n` +
      `// ORDER IMPORTANT: Spartacus styles last\n` +
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

    const filePath = project.sourceRoot + `/app/${APP_COMPONENT_HTML}`;
    const buffer = host.read(filePath);

    if (!buffer) {
      context.logger.warn(`Could not read ${APP_COMPONENT_HTML} file.`);
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
 * Checks if the app is standalone (by checking existence of app.config.ts).
 * Checks if the app uses Angular 2016 filename convention (by checking `component.ts` suffix in app.component.ts).
 *
 * @param options - The Spartacus options.
 * @returns A Rule function that checks the app structure and sets up accordingly.
 */
function detectAndSetupAppStructure(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Detecting app structure...`);
    }

    // get tsconfig file paths
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    // get project structure based on current path and path of the first found tsconfig file
    const { appSourceFiles } = createProgram(tree, basePath, buildPaths[0]);

    // check if app.config.ts exists (standalone indicator)
    const appConfig = appSourceFiles.find((sourceFile) =>
      sourceFile.getFilePath().includes(APP_CONFIG)
    );

    const advice = `Please re-create your application:
1. Remove your current application code.
2. Re-create your app using "ng new" with these CLI flags:
   - Use \`--file-name-style-guide=2016\`
   - Avoid using \`--standalone=false\`
3. try again installing Spartacus with a command "ng add @spartacus/schematics" ...`;

    if (!appConfig) {
      throw new SchematicsException(
        `Could not find ${APP_CONFIG} file. ${advice}`
      );
    }

    const appComponent = appSourceFiles.find((sourceFile) =>
      sourceFile.getFilePath().includes(APP_COMPONENT)
    );
    if (!appComponent) {
      throw new SchematicsException(
        `Could not find ${APP_COMPONENT} file. ${advice}`
      );
    }

    if (options.debug) {
      context.logger.info(`✅ App structure detection complete.`);
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
    // Apply silenceDeprecations only for `build` configuration (but not `test` - it's not supported there)
    const buildSassOptions = createSassSilenceDeprecations(
      context,
      buildStylePreprocessorOptions
    );
    const buildOptions = {
      ...architectBuild?.options,
      stylePreprocessorOptions: {
        ...buildStylePreprocessorOptions,
        ...buildSassOptions,
      },
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
  includePaths?: string[];
  [key: string]: any;
}): {
  includePaths: string[];
  [key: string]: any;
} {
  if (!angularJsonStylePreprocessorOptions) {
    angularJsonStylePreprocessorOptions = {};
  }

  const NODE_MODULES_PATH = 'node_modules/';
  const includePaths = Array.from(
    new Set([
      ...(angularJsonStylePreprocessorOptions.includePaths || []),
      NODE_MODULES_PATH,
    ])
  );

  return {
    ...angularJsonStylePreprocessorOptions,
    includePaths,
  };
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

/**
 * Replaces caret (^) with tilde (~) for Spartacus dependencies in package.json.
 *
 * Note: Angular CLI by default puts `^` in customer's `package.json` during `ng add @spartacus/schematics@latest`.
 *       But since 2211.19 we agreed to break SemVer and release breaking changes in "minor" (x.Y.z) versions,
 *       so we need to replace `^` with `~` to prevent breaking changes from being installed automatically
 *       in the future and causing peer dependency conflicts when Spartacus updates e.g. Angular versions.
 */
function replaceCaretWithTildeForSpartacusDependencies(
  options: SpartacusOptions
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Replacing ^ with ~ for @spartacus dependencies in package.json`
      );
    }

    const packageJsonFile = readPackageJson(tree);

    const DEPENDENCY_TYPES = ['dependencies', 'devDependencies'];
    const TILDE = '~';
    const CARET = '^';

    DEPENDENCY_TYPES.forEach((dependencyType) => {
      const deps = packageJsonFile[dependencyType] || {};

      const spartacusPackages = Object.keys(deps).filter((packageName) =>
        packageName.startsWith('@spartacus')
      );

      spartacusPackages.forEach((packageName) => {
        const currentVersion = deps[packageName];
        deps[packageName] = currentVersion.replace(CARET, TILDE);
      });
    });

    tree.overwrite('package.json', JSON.stringify(packageJsonFile, null, 2));

    if (options.debug) {
      context.logger.info(
        '✅ Replaced ^ with ~ for all @spartacus dependencies'
      );
    }

    return tree;
  };
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
      detectAndSetupAppStructure(options),

      createAppModule(options),
      updateAppConfig(options),
      addStorefrontComponentToAppComponent(options),

      analyzeApplication(options, features),

      setupStoreModules(options),

      scaffoldStructure(options),

      setupSpartacusModule(options),

      setupSpartacusFeaturesModule(options),

      addSpartacusConfiguration(options),

      addFeatureToggles(options),

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
        replaceCaretWithTildeForSpartacusDependencies(options),
      ]),

      finalizeInstallation(options, features),
    ])(tree, context);
  };
}
