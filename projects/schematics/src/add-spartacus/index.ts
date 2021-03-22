import { experimental } from '@angular-devkit/core';
import { italic, red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  ANGULAR_HTTP,
  ANGULAR_OAUTH2_OIDC,
  CLI_ASM_FEATURE,
  CLI_ORGANIZATION_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_FEATURE,
  CLI_PRODUCT_FEATURE,
  CLI_QUALTRICS_FEATURE,
  CLI_SMARTEDIT_FEATURE,
  CLI_STOREFINDER_FEATURE,
  DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
  DEFAULT_NGRX_VERSION,
  NGRX_EFFECTS,
  NGRX_ROUTER_STORE,
  NGRX_STORE,
  SPARTACUS_ASM,
  SPARTACUS_ASSETS,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_MODULE,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PRODUCT,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_ROUTING_MODULE,
  SPARTACUS_SETUP,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
} from '../shared/constants';
import { getIndexHtmlPath } from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '../shared/utils/html-utils';
import {
  addPackageJsonDependencies,
  createNodePackageInstallationTask,
  installPackageJsonDependencies,
  LibraryOptions,
  shouldAddFeature,
} from '../shared/utils/lib-utils';
import {
  addModuleImport,
  ensureModuleExists,
} from '../shared/utils/new-module-utils';
import {
  getAngularVersion,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
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
import {
  InstallSpartacusLibraryOptions,
  Schema as SpartacusOptions,
} from './schema';
import { setupSpartacusModule } from './spartacus';
import { setupSpartacusFeaturesModule } from './spartacus-features';
import { setupStoreModules } from './store';

function installStyles(options: SpartacusOptions): Rule {
  return (host: Tree): void => {
    const project = getProjectFromWorkspace(host, options);
    const rootStyles = getProjectTargets(project)?.build?.options?.styles?.[0];
    const styleFilePath =
      typeof rootStyles === 'object'
        ? ((rootStyles as any)?.input as string)
        : rootStyles;

    if (!styleFilePath) {
      console.warn(
        red(`Could not find the default style file for this project.`)
      );
      console.warn(red(`Please consider manually setting up spartacus styles`));
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      console.warn(
        red(`Could not find the default SCSS style file for this project. `)
      );
      console.warn(
        red(
          `Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.`
        )
      );
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(
        red(
          `Could not read the default style file within the project ` +
            `(${italic(styleFilePath)})`
        )
      );
      console.warn(red(`Please consider manually importing spartacus styles.`));
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

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}

function updateMainComponent(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree, _context: SchematicContext): Tree | void => {
    const filePath = project.sourceRoot + '/app/app.component.html';
    const buffer = host.read(filePath);

    if (!buffer) {
      console.warn(red(`Could not read app.component.html file.`));
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

function prepareDependencies(
  tree: Tree,
  options: SpartacusOptions
): NodeDependency[] {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const angularVersion = getAngularVersion(tree);

  const dependencies = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_CORE,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STOREFRONTLIB,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ASSETS,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STYLES,
    },

    {
      type: NodeDependencyType.Default,
      version: '^7.0.0',
      name: '@ng-bootstrap/ng-bootstrap',
    },
    {
      type: NodeDependencyType.Default,
      version: '^4.0.0',
      name: '@ng-select/ng-select',
    },

    {
      type: NodeDependencyType.Default,
      version: DEFAULT_NGRX_VERSION,
      name: NGRX_STORE,
    },
    {
      type: NodeDependencyType.Default,
      version: DEFAULT_NGRX_VERSION,
      name: NGRX_EFFECTS,
    },
    {
      type: NodeDependencyType.Default,
      version: DEFAULT_NGRX_VERSION,
      name: NGRX_ROUTER_STORE,
    },

    {
      type: NodeDependencyType.Default,
      version: '4.2.1',
      name: 'bootstrap',
    },
    { type: NodeDependencyType.Default, version: '^19.3.4', name: 'i18next' },
    {
      type: NodeDependencyType.Default,
      version: '^3.2.2',
      name: 'i18next-xhr-backend',
    },
    {
      type: NodeDependencyType.Default,
      version: angularVersion,
      name: '@angular/service-worker',
    },
    {
      type: NodeDependencyType.Default,
      version: '^8.0.0',
      name: 'ngx-infinite-scroll',
    },
    {
      type: NodeDependencyType.Default,
      version: DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
      name: ANGULAR_OAUTH2_OIDC,
    },
  ];
  if (options.configuration === 'b2b') {
    dependencies.push({
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SETUP,
    });
  }

  return dependencies;
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

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);

    return chain([
      addPackageJsonDependencies(prepareDependencies(tree, options)),
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

      installPackageJsonDependencies(),
    ])(tree, context);
  };
}

function addSpartacusFeatures(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      shouldAddFeature(options.features, CLI_ASM_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_ASM,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_ORGANIZATION_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_ORGANIZATION,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_PRODUCT_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_PRODUCT,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_PRODUCT_CONFIGURATOR_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_PRODUCT_CONFIGURATOR,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_QUALTRICS_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_QUALTRICS,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_SMARTEDIT_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_SMARTEDIT,
          })
        : noop(),
      shouldAddFeature(options.features, CLI_STOREFINDER_FEATURE)
        ? installExternalSchematic({
            schematicsOptions: options,
            collectionName: SPARTACUS_STOREFINDER,
          })
        : noop(),
    ])(tree, context);
  };
}

function installExternalSchematic(options: {
  schematicsOptions: SpartacusOptions;
  collectionName: string;
}): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: options.collectionName,
      },
    ];
    return chain([
      addPackageJsonDependencies(dependencies, packageJson),
      invokeAfterSchematicTask(createLibraryOptions(options)),
    ])(tree, context);
  };
}

function invokeAfterSchematicTask(options: LibraryOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const id = createNodePackageInstallationTask(context);
    context.addTask(new RunSchematicTask('add-spartacus-library', options), [
      id,
    ]);
    return tree;
  };
}

function createLibraryOptions(options: {
  schematicsOptions: SpartacusOptions;
  collectionName: string;
  schematicName?: string;
}): InstallSpartacusLibraryOptions {
  return {
    project: options.schematicsOptions.project,
    lazy: options.schematicsOptions.lazy,
    features: [],
    collectionName: options.collectionName,
    schematicName: options.schematicName ?? 'add',
  };
}
