import { experimental } from '@angular-devkit/core';
import { italic } from '@angular-devkit/core/src/terminal';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
import {
  ANGULAR_HTTP,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_MODULE,
  SPARTACUS_ROUTING_MODULE,
} from '../shared/constants';
import { getIndexHtmlPath } from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '../shared/utils/html-utils';
import {
  addPackageJsonDependencies,
  addSchematicsTasks,
  createSpartacusFeatureOptionsForLibrary,
  LibraryOptions,
  prepareCliPackageAndSubFeature,
} from '../shared/utils/lib-utils';
import {
  addModuleImport,
  ensureModuleExists,
} from '../shared/utils/new-module-utils';
import {
  getPrefixedSpartacusSchematicsVersion,
  getSpartacusCurrentFeatureLevel,
  mapPackageToNodeDependencies,
  prepare3rdPartyDependencies,
  prepareSpartacusDependencies,
  readPackageJson,
} from '../shared/utils/package-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  getProjectFromWorkspace,
  getProjectTargets,
} from '../shared/utils/workspace-utils';
import { addSpartacusConfiguration } from './configuration';
import { setupRouterModule } from './router';
import { Schema as SpartacusOptions } from './schema';
import { setupSpartacusModule } from './spartacus';
import { setupSpartacusFeaturesModule } from './spartacus-features';
import { setupStoreModules } from './store';

function installStyles(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const project = getProjectFromWorkspace(tree, options);
    const rootStyles = getProjectTargets(project)?.build?.options?.styles?.[0];
    const styleFilePath =
      typeof rootStyles === 'object'
        ? ((rootStyles as any)?.input as string)
        : rootStyles;

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
        `Could not read the default style file within the project ${italic(
          styleFilePath
        )}`
      );
      context.logger.warn(
        `Please consider manually importing spartacus styles.`
      );
      return;
    }

    const htmlContent = buffer.toString();
    const insertion =
      '\n' +
      `$styleVersion: ${
        options.featureLevel || getSpartacusCurrentFeatureLevel()
      };\n@import '~@spartacus/styles/index';\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = tree.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    tree.commitUpdate(recorder);
  };
}

function updateMainComponent(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree, context: SchematicContext): Tree | void => {
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

    return host;
  };
}

function updateIndexFile(tree: Tree, options: SpartacusOptions): Rule {
  return (host: Tree): Tree => {
    const projectIndexHtmlPath = getIndexHtmlPath(tree);
    const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';

    const metaTags = [
      `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
      `<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />`,
    ];

    metaTags.forEach((metaTag) => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    return host;
  };
}

export function prepareDependencies(
  options: SpartacusOptions
): NodeDependency[] {
  const spartacusDependencies = prepareSpartacusDependencies(
    options.configuration === 'b2b'
  );
  return spartacusDependencies.concat(prepare3rdPartyDependencies());
}

function updateAppModule(project: string): Rule {
  return (tree: Tree): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

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
          addModuleImport(sourceFile, {
            order: 1,
            import: {
              moduleSpecifier: ANGULAR_HTTP,
              namedImports: ['HttpClientModule'],
            },
            content: 'HttpClientModule',
          });

          saveAndFormat(sourceFile);

          break;
        }
      }
    }
    return tree;
  };
}

function addSpartacusFeatures(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const cliFeatures = prepareCliPackageAndSubFeature(options.features ?? []);
    const libraryOptions: LibraryOptions = {
      project: options.project,
      lazy: options.lazy,
    };
    const featureOptions = createSpartacusFeatureOptionsForLibrary(
      libraryOptions,
      cliFeatures
    );
    addSchematicsTasks(featureOptions, context);

    const packageJson = readPackageJson(tree);
    const spartacusVersion = getPrefixedSpartacusSchematicsVersion();
    const dependencies = Object.keys(cliFeatures).map((feature) =>
      mapPackageToNodeDependencies(feature, spartacusVersion)
    );
    return addPackageJsonDependencies(dependencies, packageJson)(tree, context);
  };
}

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);

    return chain([
      addPackageJsonDependencies(prepareDependencies(options)),
      ensureModuleExists({
        name: SPARTACUS_ROUTING_MODULE,
        path: 'app',
        module: 'app',
        project: options.project,
      }),
      setupRouterModule(options.project),
      setupStoreModules(options.project),

      ensureModuleExists({
        name: SPARTACUS_MODULE,
        path: 'app/spartacus',
        module: 'app',
        project: options.project,
      }),
      setupSpartacusModule(options.project),

      ensureModuleExists({
        name: SPARTACUS_FEATURES_MODULE,
        path: 'app/spartacus',
        module: 'spartacus',
        project: options.project,
      }),
      setupSpartacusFeaturesModule(options.project),

      ensureModuleExists({
        name: SPARTACUS_CONFIGURATION_MODULE,
        path: 'app/spartacus',
        module: 'spartacus',
        project: options.project,
      }),
      addSpartacusConfiguration(options),

      updateAppModule(options.project),
      installStyles(options),
      updateMainComponent(project, options),
      options.useMetaTags ? updateIndexFile(tree, options) : noop(),

      addSpartacusFeatures(options),
    ])(tree, context);
  };
}
