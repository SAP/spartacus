import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  chain,
  ExecutionOptions,
  externalSchematic,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  TaskId,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { CallExpression, Node, SourceFile, ts as tsMorph } from 'ts-morph';
import collectedDependencies from '../../dependencies.json';
import {
  ANGULAR_CORE,
  CMS_CONFIG,
  I18N_CONFIG,
  PROVIDE_CONFIG_FUNCTION,
  UTF_8,
} from '../constants';
import {
  CORE_SPARTACUS_SCOPES,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_FEATURES_NG_MODULE,
  SPARTACUS_SCOPE,
  SPARTACUS_SETUP,
} from '../libs-constants';
import { packageSubFeaturesMapping } from '../updateable-constants';
import { getB2bConfiguration } from './config-utils';
import { Graph, kahnsAlgorithm } from './graph-utils';
import { isImportedFrom } from './import-utils';
import {
  addModuleImport,
  addModuleProvider,
  collectInstalledModules,
  ensureModuleExists,
  getModulePropertyInitializer,
  Import,
} from './new-module-utils';
import {
  createDependencies,
  createSpartacusDependencies,
  getPrefixedSpartacusSchematicsVersion,
  readPackageJson,
} from './package-utils';
import { createProgram, saveAndFormat } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import {
  getDefaultProjectNameFromWorkspace,
  getSourceRoot,
  getWorkspace,
  scaffoldStructure,
} from './workspace-utils';

export interface LibraryOptions extends Partial<ExecutionOptions> {
  project: string;
  lazy?: boolean;
  features?: string[];
  /**
   * When enabled, prints the additional logs.
   */
  debug?: boolean;
  /**
   * Meta.
   * Populated when programmatically invoking
   * Spartacus installation schematics in order
   * to install them as dependencies.
   */
  options?: LibraryOptions;
}

export interface FeatureConfig {
  /**
   * The folder in which we will generate the feature module. E.g. app/spartacus/features/__organization__ (__NOTE__: just the `organization` part should be provided.).
   */
  folderName: string;
  /**
   * Used as the generated feature module's file name.
   * Also, used as the lazy loading's feature name if the `lazyLoadingChunk` config is not provided.
   */
  moduleName: string;
  /**
   * The feature module configuration.
   */
  featureModule: Module | Module[];
  /**
   * The root module configuration.
   */
  rootModule?: Module;
  /**
   * The lazy loading chunk's name.
   * It's usually a constant imported from a library.
   */
  lazyLoadingChunk?: Import;
  /**
   * Translation chunk configuration
   */
  i18n?: I18NConfig;
  /**
   * Styling configuration
   */
  styles?: StylingConfig;
  /**
   * Assets configuration
   */
  assets?: AssetsConfig;
  /**
   * An optional custom configuration to provide to the generated module.
   */
  customConfig?: CustomConfig | CustomConfig[];
  /**
   * Configure it if a feature requires another feature
   * to be configured before it.
   */
  dependencyManagement?: DependencyManagement;
  /**
   * If set to true, instead of appending the configuration to the existing module,
   * it will recreate the feature module with the new configuration.
   */
  recreate?: boolean;
}

/**
 * Dependency management for the library
 */
export interface DependencyManagement {
  /**
   * The name of the feature that's currently being installed.
   */
  featureName: string;
  /**
   * Contains the feature dependencies.
   * The key is a Spartacus scope, while the value is an array of its features.
   */
  featureDependencies: Record<string, string[]>;
}

export interface CustomConfig {
  import: Import[];
  content: string;
}

export interface Module {
  name: string;
  importPath: string;
  content?: string;
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

export const dependencyGraph: Graph = createLibraryDependencyGraph();
export const installationOrder: string[] = kahnsAlgorithm(dependencyGraph);

export function shouldAddFeature(
  feature: string,
  features: string[] = []
): boolean {
  return features.includes(feature);
}

export function prepareCliPackageAndSubFeature(
  features: string[]
): Record<string, string[]> {
  return features.reduce((cliFeatures, subFeature) => {
    const packageName = getPackageBySubFeature(subFeature);
    const subFeatures = [...(cliFeatures[packageName] ?? []), subFeature];

    return { ...cliFeatures, [packageName]: subFeatures };
  }, {} as Record<string, string[]>);
}

export function getPackageBySubFeature(subFeature: string): string {
  for (const spartacusPackage in packageSubFeaturesMapping) {
    if (!packageSubFeaturesMapping.hasOwnProperty(spartacusPackage)) {
      continue;
    }

    const subFeatures = packageSubFeaturesMapping[spartacusPackage];
    if (subFeatures.includes(subFeature)) {
      return spartacusPackage;
    }
  }

  throw new SchematicsException(
    `The given '${subFeature}' doesn't contain a Spartacus package mapping.
Please check 'packageSubFeaturesMapping' in 'projects/schematics/src/shared/updateable-constants.ts'`
  );
}

function createLibraryDependencyGraph(): Graph {
  const skip = CORE_SPARTACUS_SCOPES.concat(
    'storefrontapp-e2e-cypress',
    'storefrontapp'
  );
  return createDependencyGraph(collectedDependencies, skip);
}

function createDependencyGraph(
  dependencies: Record<string, Record<string, string>>,
  skip: string[] = []
): Graph {
  const spartacusLibraries = Object.keys(dependencies).filter(
    (dependency) => !skip.includes(dependency)
  );

  const graph = new Graph(spartacusLibraries);
  for (const spartacusLib of spartacusLibraries) {
    const spartacusPeerDependencies = getSpartacusLibraries(
      dependencies[spartacusLib]
    );
    for (const spartacusPackage of spartacusPeerDependencies) {
      if (skip.includes(spartacusPackage)) {
        continue;
      }

      graph.createEdge(spartacusLib, spartacusPackage);
    }
  }

  return graph;
}

export function getSpartacusLibraries(
  dependencies: Record<string, string>
): string[] {
  return Object.keys(dependencies).filter((dependency) =>
    dependency.startsWith(SPARTACUS_SCOPE)
  );
}

export function addLibraryFeature<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusFeatureModuleExistsInApp = checkAppStructure(
      tree,
      options.project
    );
    if (!spartacusFeatureModuleExistsInApp) {
      context.logger.info('Scaffolding the new app structure...');
      context.logger.warn(
        'Please migrate manually the rest of your feature modules to the new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/'
      );
    }
    return chain([
      spartacusFeatureModuleExistsInApp ? noop() : scaffoldStructure(options),

      handleFeature(options, config),
      config.styles ? addLibraryStyles(config.styles, options) : noop(),
      config.assets ? addLibraryAssets(config.assets, options) : noop(),
      config.dependencyManagement
        ? installRequiredSpartacusFeatures(config.dependencyManagement, options)
        : noop(),

      orderInstalledFeatures(options),
    ]);
  };
}

export function checkAppStructure(tree: Tree, project: string): boolean {
  const { buildPaths } = getProjectTsConfigPaths(tree, project);

  if (!buildPaths.length) {
    throw new SchematicsException(
      `Could not find any tsconfig file. Can't find ${SPARTACUS_FEATURES_NG_MODULE}.`
    );
  }

  const basePath = process.cwd();
  for (const tsconfigPath of buildPaths) {
    if (getSpartacusFeaturesModule(tree, basePath, tsconfigPath)) {
      return true;
    }
  }
  return false;
}

/**
 * If exists, it returns the spartacus-features.module.ts' source.
 * Otherwise, it returns undefined.
 */
function getSpartacusFeaturesModule(
  tree: Tree,
  basePath: string,
  tsconfigPath: string
): SourceFile | undefined {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
    ) {
      if (getSpartacusFeaturesNgModuleDecorator(sourceFile)) {
        return sourceFile;
      }
    }
  }
  return undefined;
}

/**
 * Returns the NgModule decorator, if exists.
 */
function getSpartacusFeaturesNgModuleDecorator(
  sourceFile: SourceFile
): CallExpression | undefined {
  let spartacusFeaturesModule: CallExpression | undefined;

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, ANGULAR_CORE)
      ) {
        const classDeclaration = node.getFirstAncestorByKind(
          tsMorph.SyntaxKind.ClassDeclaration
        );
        if (classDeclaration) {
          const identifier = classDeclaration.getNameNode();
          if (
            identifier &&
            identifier.getText() === SPARTACUS_FEATURES_NG_MODULE
          ) {
            spartacusFeaturesModule = node;
          }
        }
      }
    }

    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return spartacusFeaturesModule;
}

function handleFeature<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const rules: Rule[] = [];

    if (config.recreate) {
      rules.push(deleteFeatureModuleFile(options, config));
    }

    rules.push(
      ensureModuleExists({
        name: `${dasherize(config.moduleName)}-feature`,
        path: `app/spartacus/features/${config.folderName}`,
        module: SPARTACUS_FEATURES_MODULE,
        project: options.project,
      })
    );
    rules.push(addRootModule(options, config));
    rules.push(addFeatureModule(options, config));
    rules.push(addFeatureTranslations(options, config));
    rules.push(addCustomConfig(options, config));

    return chain(rules);
  };
}

function deleteFeatureModuleFile<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree): Tree => {
    const basePath = process.cwd();

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const moduleFileName = createModuleFileName(config);
      for (const sourceFile of appSourceFiles) {
        if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
          continue;
        }

        sourceFile.deleteImmediatelySync();
        break;
      }
    }

    return tree;
  };
}

function addRootModule<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree): Tree => {
    if (!config.rootModule) {
      return tree;
    }

    const basePath = process.cwd();
    const moduleFileName = createModuleFileName(config);

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
          continue;
        }

        addModuleImport(sourceFile, {
          import: {
            moduleSpecifier: config.rootModule.importPath,
            namedImports: [config.rootModule.name],
          },
          content: config.rootModule.content || config.rootModule.name,
        });

        saveAndFormat(sourceFile);
        break;
      }
    }

    return tree;
  };
}

function addFeatureModule<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree): Tree => {
    const basePath = process.cwd();
    const moduleFileName = createModuleFileName(config);

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
          continue;
        }

        const configFeatures = ([] as Module[]).concat(config.featureModule);

        if (options.lazy) {
          let content = `${PROVIDE_CONFIG_FUNCTION}(<${CMS_CONFIG}>{
            featureModules: {`;
          for (let i = 0; i < configFeatures.length; i++) {
            const featureModule = configFeatures[i];
            let lazyLoadingChunkName = config.moduleName;
            if (config.lazyLoadingChunk) {
              const namedImportsContent =
                config.lazyLoadingChunk.namedImports[i];
              lazyLoadingChunkName = `[${namedImportsContent}]`;
              sourceFile.addImportDeclaration(config.lazyLoadingChunk);
            }
            content =
              content +
              `${lazyLoadingChunkName}: {
              module: () =>
                import('${featureModule.importPath}').then((m) => m.${featureModule.name}),
            },`;
          }
          addModuleProvider(sourceFile, {
            import: [
              {
                moduleSpecifier: SPARTACUS_CORE,
                namedImports: [PROVIDE_CONFIG_FUNCTION, CMS_CONFIG],
              },
            ],
            content: content + `}})`,
          });
        } else {
          for (let featureModule of configFeatures) {
            addModuleImport(sourceFile, {
              import: {
                moduleSpecifier: featureModule.importPath,
                namedImports: [featureModule.name],
              },
              content: featureModule.content || featureModule.name,
            });
          }
        }

        saveAndFormat(sourceFile);
        break;
      }
    }
    return tree;
  };
}

export function addFeatureTranslations<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree): Tree => {
    if (!config.i18n) {
      return tree;
    }

    const basePath = process.cwd();
    const moduleFileName = createModuleFileName(config);

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
          continue;
        }

        addModuleProvider(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: [PROVIDE_CONFIG_FUNCTION, I18N_CONFIG],
            },
            {
              moduleSpecifier: config.i18n.importPath,
              namedImports: [config.i18n.chunks, config.i18n.resources],
            },
          ],
          content: `${PROVIDE_CONFIG_FUNCTION}(<${I18N_CONFIG}>{
              i18n: {
                resources: ${config.i18n.resources},
                chunks: ${config.i18n.chunks},
              },
            })`,
        });

        saveAndFormat(sourceFile);
        break;
      }
    }
    return tree;
  };
}

function addCustomConfig<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree): Tree => {
    if (!config.customConfig) {
      return tree;
    }

    const basePath = process.cwd();
    const moduleFileName = createModuleFileName(config);

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
          continue;
        }

        const customConfigs = ([] as CustomConfig[]).concat(
          config.customConfig
        );
        customConfigs.forEach((customConfig) => {
          addModuleProvider(sourceFile, {
            import: [
              {
                moduleSpecifier: SPARTACUS_CORE,
                namedImports: [PROVIDE_CONFIG_FUNCTION],
              },
              ...customConfig.import,
            ],
            content: `${PROVIDE_CONFIG_FUNCTION}(${customConfig.content})`,
          });
        });

        saveAndFormat(sourceFile);
        break;
      }
    }
    return tree;
  };
}

function addLibraryAssets(
  assetsConfig: AssetsConfig,
  options: LibraryOptions
): Rule {
  return (tree: Tree) => {
    const { path, workspace: angularJson } = getWorkspace(tree);
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);
    const project = options.project || defaultProject;
    const architect = angularJson.projects[project].architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildAssets = createAssetsArray(
      assetsConfig,
      (architectBuild?.options as any)?.assets
    );
    const buildOptions = {
      ...architectBuild?.options,
      assets: buildAssets,
    };

    // `test` architect section
    const architectTest = architect?.test;
    const testAssets = createAssetsArray(
      assetsConfig,
      (architectTest?.options as any)?.assets
    );
    const testOptions = {
      ...architectTest?.options,
      assets: testAssets,
    };

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [project]: {
          ...angularJson.projects[project],
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

    const initialContent = tree.read(path)?.toString(UTF_8) ?? '';
    const toUpdate = JSON.stringify(updatedAngularJson, null, 2);
    // prevent the unnecessary Angular logs about the files being updated
    if (initialContent !== toUpdate) {
      tree.overwrite(path, toUpdate);
    }
  };
}

function createAssetsArray(
  assetsConfig: AssetsConfig,
  angularJsonAssets: any[] = []
): unknown[] {
  for (const asset of angularJsonAssets) {
    if (typeof asset === 'object') {
      if (
        asset.glob === assetsConfig.glob &&
        asset.input === `./node_modules/@spartacus/${assetsConfig.input}` &&
        asset.output === (assetsConfig.output || 'assets/')
      ) {
        return angularJsonAssets;
      }
    }
  }

  angularJsonAssets = [
    ...angularJsonAssets,
    {
      glob: assetsConfig.glob,
      input: `./node_modules/@spartacus/${assetsConfig.input}`,
      output: assetsConfig.output || 'assets/',
    },
  ];

  return angularJsonAssets;
}

export function addLibraryStyles(
  stylingConfig: StylingConfig,
  options: LibraryOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);
    const project = options.project || defaultProject;
    const libraryScssPath = `${getSourceRoot(tree, {
      project: project,
    })}/styles/spartacus/${stylingConfig.scssFileName}`;
    const toAdd = `@import "${stylingConfig.importStyle}";`;

    if (tree.exists(libraryScssPath)) {
      const initialContent = tree.read(libraryScssPath)?.toString(UTF_8) ?? '';
      let content = initialContent;

      if (!content.includes(toAdd)) {
        content += `\n${toAdd}`;
      }

      // prevent the unnecessary Angular logs about the files being updated
      if (initialContent !== content) {
        tree.overwrite(libraryScssPath, content);
      }
      return tree;
    }

    tree.create(libraryScssPath, toAdd);

    const { path, workspace: angularJson } = getWorkspace(tree);
    const architect = angularJson.projects[project].architect;

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
        [project]: {
          ...angularJson.projects[project],
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
  packageJson: any
): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    for (const dependency of dependencies) {
      if (!dependencyExists(dependency, packageJson)) {
        addPackageJsonDependency(tree, dependency);
        context.logger.info(
          `✅️ Added '${dependency.name}' into ${dependency.type}`
        );
      }
    }
    return tree;
  };
}

export function addPackageJsonDependenciesForLibrary<
  OPTIONS extends LibraryOptions
>(dependencies: Record<string, string>, options: OPTIONS): Rule {
  return (tree: Tree, context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    const spartacusLibraries = createSpartacusDependencies(dependencies);
    const thirdPartyLibraries = createDependencies(dependencies);
    const libraries = spartacusLibraries.concat(thirdPartyLibraries);

    const cliFeatures = spartacusLibraries
      .map((dependency) => dependency.name)
      .reduce((previous, current) => {
        return {
          ...previous,
          /**
           * Just install the Spartacus library,
           * but don't configure any sub-features
           */
          [current]: [],
        };
      }, {} as Record<string, string[]>);
    const featureOptions = createSpartacusFeatureOptionsForLibrary(
      options,
      cliFeatures,
      false
    );
    addSchematicsTasks(featureOptions, context);

    return chain([
      addPackageJsonDependencies(libraries, packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function installRequiredSpartacusFeatures<OPTIONS extends LibraryOptions>(
  dependencyManagement: DependencyManagement,
  options: OPTIONS
): Rule {
  return (_tree: Tree, context: SchematicContext): void => {
    if (!dependencyManagement) {
      return;
    }

    logFeatureInstallation(dependencyManagement, context);
    const featureOptions = createSpartacusFeatureOptionsForLibrary(
      options,
      dependencyManagement.featureDependencies
    );
    addSchematicsTasks(featureOptions, context);
  };
}

function logFeatureInstallation(
  dependencyManagement: DependencyManagement,
  context: SchematicContext
): void {
  const cliFeatures = dependencyManagement.featureDependencies;
  for (const spartacusScope in cliFeatures) {
    if (!cliFeatures.hasOwnProperty(spartacusScope)) {
      continue;
    }

    const requiredFeatures = cliFeatures[spartacusScope].join(',');
    context.logger.info(
      `⚙️  ${dependencyManagement.featureName} requires the following features from ${spartacusScope}: ${requiredFeatures}`
    );
  }
}

export function dependencyExists(
  dependency: NodeDependency,
  packageJson: any
): boolean {
  return packageJson[dependency.type]?.hasOwnProperty(dependency.name);
}

export function configureB2bFeatures<T extends LibraryOptions>(
  options: T,
  packageJson: any
): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const spartacusVersion = getPrefixedSpartacusSchematicsVersion();
    return chain([
      addB2bProviders(options),
      addPackageJsonDependencies(
        [
          {
            type: NodeDependencyType.Default,
            version: spartacusVersion,
            name: SPARTACUS_SETUP,
          },
        ],
        packageJson
      ),
    ]);
  };
}

function addB2bProviders<T extends LibraryOptions>(options: T): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure SpartacusConfigurationModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (
          !sourceFile
            .getFilePath()
            .includes(`${SPARTACUS_CONFIGURATION_MODULE}.module.ts`)
        ) {
          continue;
        }

        getB2bConfiguration().forEach((provider) =>
          addModuleProvider(sourceFile, provider)
        );

        saveAndFormat(sourceFile);
        break;
      }
    }

    return tree;
  };
}

/**
 * A helper method that creates the default options for the given Spartacus' libraries.
 *
 * All `features` options will be set to an empty array, meaning that no features should be installed.
 *
 * @param spartacusLibraries
 * @param options
 * @returns
 */
export function createSpartacusFeatureOptionsForLibrary<
  OPTIONS extends LibraryOptions
>(
  options: OPTIONS,
  cliFeatures: Record<string, string[]>,
  interactive = true
): {
  feature: string;
  options: LibraryOptions;
}[] {
  return Object.keys(cliFeatures).map((spartacusLibrary) => ({
    feature: spartacusLibrary,
    options: {
      ...options,
      // an empty array means that no library features will be installed.
      features: cliFeatures[spartacusLibrary] ?? [],
      interactive,
    },
  }));
}

export function addSchematicsTasks(
  featureOptions: {
    feature: string;
    options: LibraryOptions;
  }[],
  context: SchematicContext
): void {
  const installationTaskId = createNodePackageInstallationTask(context);

  featureOptions.forEach((featureOption) => {
    const runSchematicTaskOptions: RunSchematicTaskOptions<LibraryOptions> = {
      collection: featureOption.feature,
      name: 'add',
      options: featureOption.options,
    };

    context.addTask(
      new RunSchematicTask('add-spartacus-library', runSchematicTaskOptions),
      [installationTaskId]
    );
  });
}

export function runExternalSpartacusLibrary(
  taskOptions: RunSchematicTaskOptions<LibraryOptions>
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!taskOptions.collection) {
      throw new SchematicsException(
        `Can't run the Spartacus library schematic, please specify the 'collection' argument.`
      );
    }

    const executionOptions: Partial<ExecutionOptions> = {
      interactive: taskOptions.options.interactive,
    };

    return chain([
      externalSchematic(
        taskOptions.collection,
        taskOptions.name,
        taskOptions.options,
        executionOptions
      ),
    ])(tree, context);
  };
}

function createModuleFileName(config: FeatureConfig): string {
  return `${dasherize(config.moduleName)}-feature.module.ts`;
}

/**
 * Used to sort the features in the correct order.
 */
function calculateSort(libraryA: string, libraryB: string): number {
  const indexA = installationOrder.indexOf(libraryA);
  const indexB = installationOrder.indexOf(libraryB);

  /**
   * In case a feature module is _not_ found in the `installationOrder`,
   * we want to sort it at the end of the list.
   */
  return (indexA > -1 ? indexA : Infinity) - (indexB > -1 ? indexB : Infinity);
}

export function orderInstalledFeatures<T extends LibraryOptions>(
  options: T
): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    let message = `Ordering the installed Spartacus features...`;
    if (options.debug) {
      message = `Sorting the installed Spartacus features according to the dependency graph: ${installationOrder.join(
        ', '
      )}`;
    }
    context.logger.info(message);

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const spartacusFeaturesModule = getSpartacusFeaturesModule(
        tree,
        basePath,
        tsconfigPath
      );
      if (!spartacusFeaturesModule) {
        continue;
      }

      const collectedModules = collectInstalledModules(spartacusFeaturesModule);
      if (!collectedModules) {
        continue;
      }

      const spartacusCoreModules = collectedModules.spartacusCoreModules.map(
        (spartacusCoreModule) => spartacusCoreModule.getText()
      );
      const featureModules = collectedModules.featureModules
        .sort((moduleA, moduleB) =>
          calculateSort(moduleA.spartacusLibrary, moduleB.spartacusLibrary)
        )
        .map((featureModule) => featureModule.moduleNode.getText());
      const unrecognizedModules = collectedModules.unrecognizedModules.map(
        (unrecognizedModule) => unrecognizedModule.getText()
      );

      const moduleImportsProperty = getModulePropertyInitializer(
        spartacusFeaturesModule,
        'imports',
        false
      );
      if (!moduleImportsProperty) {
        continue;
      }

      if (collectedModules.warnings.length) {
        context.logger.warn(
          'The following modules were not recognized due to various reasons:'
        );
        for (const warning of collectedModules.warnings) {
          context.logger.warn(warning);
        }
      }

      const orderedModules: string[] = spartacusCoreModules
        .concat(featureModules)
        .concat(unrecognizedModules);
      moduleImportsProperty.replaceWithText(`[${orderedModules.join(',\n')}]`);
      saveAndFormat(spartacusFeaturesModule);
    }
  };
}
