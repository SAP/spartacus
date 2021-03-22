import {
  chain,
  noop,
  Rule,
  SchematicContext,
  TaskId,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { findNodes, isImported } from '@schematics/angular/utility/ast-utils';
import { Change, NoopChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
} from '@schematics/angular/utility/dependencies';
import ts from 'typescript';
import {
  PROVIDE_CONFIG_FUNCTION,
  PROVIDE_DEFAULT_CONFIG,
  SPARTACUS_CORE,
} from '../constants';
import {
  createNewConfig,
  getConfig,
  getExistingStorefrontConfigNode,
} from './config-utils';
import { commitChanges, getTsSourceFile } from './file-utils';
import {
  addToModuleImports,
  addToModuleProviders,
  createImportChange,
} from './module-file-utils';
import {
  getDefaultProjectNameFromWorkspace,
  getSourceRoot,
  getWorkspace,
} from './workspace-utils';

export interface LibraryOptions {
  lazy: boolean;
  features: string[];
  project: string;
}

export interface FeatureConfig {
  name: string;
  featureModule: Module;
  rootModule: Module;
  i18n?: I18NConfig;
  defaultConfig?: {
    name: string;
    importPath: string;
  };
  styles?: StylingConfig;
  assets?: AssetsConfig;
}

export interface Module {
  name: string;
  importPath: string;
}

export interface I18NConfig {
  resources: string;
  chunks: string;
  importPath: string;
}

export interface StylingConfig {
  scssFileName: string;
  importStyle: string;
}

export interface AssetsConfig {
  input: string;
  output?: string;
  glob: string;
}

export function shouldAddFeature(features: string[], feature: string): boolean {
  return features.includes(feature);
}

export function addLibraryFeature<T extends LibraryOptions>(
  appModulePath: string,
  options: T,
  config: FeatureConfig
): Rule {
  return chain([
    handleFeature(appModulePath, options, config),
    config.styles ? addLibraryStyles(config.styles) : noop(),
    config.assets ? addLibraryAssets(config.assets) : noop(),
  ]);
}

function handleFeature<T extends LibraryOptions>(
  appModulePath: string,
  options: T,
  config: FeatureConfig
): Rule {
  return (host: Tree, context: SchematicContext) => {
    const changes: Change[] = [];

    if (
      config.defaultConfig &&
      !isImported(
        getTsSourceFile(host, appModulePath),
        PROVIDE_DEFAULT_CONFIG,
        SPARTACUS_CORE
      )
    ) {
      const coreImportChange = createImportChange(
        host,
        appModulePath,
        PROVIDE_DEFAULT_CONFIG,
        SPARTACUS_CORE
      );
      changes.push(coreImportChange);

      const providersChanges = addToModuleProviders(
        host,
        appModulePath,
        `${PROVIDE_DEFAULT_CONFIG}(${config.defaultConfig.name}),`,
        getTsSourceFile(host, appModulePath)
      );
      changes.push(...providersChanges);
    }

    if (config.defaultConfig) {
      const setupImportChange = createImportChange(
        host,
        appModulePath,
        config.defaultConfig.name,
        config.defaultConfig.importPath
      );
      changes.push(setupImportChange);
    }

    // import root module
    if (
      !isImported(
        getTsSourceFile(host, appModulePath),
        config.rootModule.name,
        config.rootModule.importPath
      )
    ) {
      const rootModuleImportChange = createImportChange(
        host,
        appModulePath,
        config.rootModule.name,
        config.rootModule.importPath
      );
      const rootModuleAddedToImportsChanges = addToModuleImports(
        host,
        appModulePath,
        config.rootModule.name
      );
      changes.push(rootModuleImportChange, ...rootModuleAddedToImportsChanges);
    }

    if (config.i18n) {
      const i18nChanges = provideI18NConfig(
        host,
        getTsSourceFile(host, appModulePath),
        config.i18n
      );
      changes.push(...i18nChanges);
    }

    if (options.lazy) {
      const lazyLoadingChange = mergeLazyLoadingConfig(
        context,
        getTsSourceFile(host, appModulePath),
        {
          name: config.name,
          module: config.featureModule,
        }
      );
      changes.push(lazyLoadingChange);
    } else {
      if (
        !isImported(
          getTsSourceFile(host, appModulePath),
          config.featureModule.name,
          config.featureModule.importPath
        )
      ) {
        const featureModuleImportChange = createImportChange(
          host,
          appModulePath,
          config.featureModule.name,
          config.featureModule.importPath
        );
        changes.push(featureModuleImportChange);
      }

      const addedToImportsChanges = addToModuleImports(
        host,
        appModulePath,
        config.featureModule.name
      );
      changes.push(...addedToImportsChanges);
    }

    commitChanges(host, appModulePath, changes);
    return host;
  };
}

function mergeLazyLoadingConfig(
  context: SchematicContext,
  moduleSource: ts.SourceFile,
  config: {
    name: string;
    module: Module;
  }
): Change {
  const storefrontConfig = getExistingStorefrontConfigNode(moduleSource);
  const lazyLoadingModule = `module: () => import('${config.module.importPath}').then(
          (m) => m.${config.module.name}
        ),`;
  const lazyLoadingFeatureModule = `featureModules: {
        ${config.name}: {
          ${lazyLoadingModule}
        },
      }`;

  if (!storefrontConfig) {
    context.logger
      .warn(`Storefront config not detected in ${moduleSource.fileName}, unable to configure lazy loading.
Please manually append the following configuration:

${lazyLoadingFeatureModule}
`);
    return new NoopChange();
  }

  const currentFeatureModulesConfig = getConfig(
    storefrontConfig,
    'featureModules'
  );
  if (!currentFeatureModulesConfig) {
    const syntaxListNode = findNodes(
      storefrontConfig,
      ts.SyntaxKind.SyntaxList,
      1,
      true
    )[0] as ts.SyntaxList;
    const objectLiteralExpression = findNodes(
      syntaxListNode,
      ts.SyntaxKind.ObjectLiteralExpression,
      1,
      true
    )[0] as ts.ObjectLiteralExpression;

    const change = createNewConfig(
      moduleSource.fileName,
      objectLiteralExpression,
      '',
      lazyLoadingFeatureModule
    );
    return change;
  }

  let configChange = `{
    ${lazyLoadingModule}
}
`;

  const featureModuleConfig = getConfig(
    currentFeatureModulesConfig,
    config.name
  );
  if (featureModuleConfig) {
    const lazyLoadConfig = getConfig(featureModuleConfig, 'module');
    if (lazyLoadConfig) {
      return new NoopChange();
    }
    configChange = lazyLoadingModule;

    const nestedProperty = findNodes(
      featureModuleConfig,
      ts.SyntaxKind.PropertyAssignment,
      1,
      true
    )[0] as ts.PropertyAssignment;
    return createNewConfig(
      moduleSource.fileName,
      nestedProperty,
      config.name,
      configChange
    );
  } else {
    return createNewConfig(
      moduleSource.fileName,
      currentFeatureModulesConfig,
      config.name,
      `{
        ${lazyLoadingModule}
        }`
    );
  }
}

function provideI18NConfig(
  host: Tree,
  source: ts.SourceFile,
  i18nConfig: I18NConfig
): Change[] {
  const changes: Change[] = [];
  if (!isImported(source, PROVIDE_CONFIG_FUNCTION, SPARTACUS_CORE)) {
    const importChange = createImportChange(
      host,
      source.fileName,
      PROVIDE_CONFIG_FUNCTION,
      SPARTACUS_CORE
    );
    changes.push(importChange);
  }

  if (
    !isImported(source, i18nConfig.resources, i18nConfig.importPath) &&
    !isImported(source, i18nConfig.chunks, i18nConfig.importPath)
  ) {
    const resourceImportChange = createImportChange(
      host,
      source.fileName,
      i18nConfig.resources,
      i18nConfig.importPath
    );
    const chunkImportChange = createImportChange(
      host,
      source.fileName,
      i18nConfig.chunks,
      i18nConfig.importPath
    );

    const providersChanges = addToModuleProviders(
      host,
      source.fileName,
      `
    ${PROVIDE_CONFIG_FUNCTION}({
      i18n: {
        resources: ${i18nConfig.resources},
        chunks: ${i18nConfig.chunks},
      },
    })`
    );

    changes.push(resourceImportChange, chunkImportChange, ...providersChanges);
  }

  return changes;
}

function addLibraryAssets(assetsConfig: AssetsConfig): Rule {
  return (tree: Tree) => {
    const { path, workspace: angularJson } = getWorkspace(tree);
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);
    const architect = angularJson.projects[defaultProject].architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildOptions = {
      ...architectBuild?.options,
      assets: [
        ...((architectBuild?.options as any)?.assets
          ? (architectBuild?.options as any)?.assets
          : []),
        {
          glob: assetsConfig.glob,
          input: './node_modules/@spartacus/' + assetsConfig.input,
          output: assetsConfig.output || 'assets/',
        },
      ],
    };

    // `test` architect section
    const architectTest = architect?.test;
    const testOptions = {
      ...architectTest?.options,
      assets: [
        ...(architectTest?.options?.assets
          ? architectTest?.options?.assets
          : []),
        {
          glob: assetsConfig.glob,
          input: './node_modules/@spartacus/' + assetsConfig.input,
          output: assetsConfig.output || 'assets/',
        },
      ],
    };

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [defaultProject]: {
          ...angularJson.projects[defaultProject],
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
  };
}

export function addLibraryStyles(stylingConfig: StylingConfig): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const libraryScssPath = `${getSourceRoot(tree)}/styles/spartacus/${
      stylingConfig.scssFileName
    }`;
    if (tree.exists(libraryScssPath)) {
      context.logger.info(
        `Skipping the creation of '${libraryScssPath}', as it already exists.`
      );
      return noop();
    }

    tree.create(libraryScssPath, `@import "${stylingConfig.importStyle}";`);

    const { path, workspace: angularJson } = getWorkspace(tree);
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);

    const architect = angularJson.projects[defaultProject].architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildOptions = {
      ...architectBuild?.options,
      styles: [
        ...((architectBuild?.options as any)?.styles
          ? (architectBuild?.options as any)?.styles
          : []),
        libraryScssPath,
      ],
    };

    // `test` architect section
    const architectTest = architect?.test;
    const testOptions = {
      ...architectTest?.options,
      styles: [
        ...(architectTest?.options?.styles
          ? architectTest?.options?.styles
          : []),
        libraryScssPath,
      ],
    };

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [defaultProject]: {
          ...angularJson.projects[defaultProject],
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
  };
}

export function createNodePackageInstallationTask(
  context: SchematicContext
): TaskId {
  context.logger.log('info', `🔍 Installing packages...`);
  return context.addTask(new NodePackageInstallTask());
}

export function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    createNodePackageInstallationTask(context);
    return tree;
  };
}

export function addPackageJsonDependencies(
  dependencies: NodeDependency[],
  packageJson?: any
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    dependencies.forEach((dependency) => {
      if (
        !packageJson ||
        !packageJson.dependencies.hasOwnProperty(dependency.name)
      ) {
        addPackageJsonDependency(tree, dependency);
        context.logger.info(
          `✅️ Added '${dependency.name}' into ${dependency.type}`
        );
      }
    });
    return tree;
  };
}
