import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  TaskId,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { CallExpression, Node, SourceFile, ts as tsMorph } from 'ts-morph';
import {
  ANGULAR_CORE,
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_FEATURES_NG_MODULE,
  SPARTACUS_SETUP,
} from '../constants';
import { getB2bConfiguration } from './config-utils';
import { isImportedFrom } from './import-utils';
import {
  addModuleImport,
  addModuleProvider,
  ensureModuleExists,
  Import,
} from './new-module-utils';
import { getSpartacusSchematicsVersion } from './package-utils';
import { createProgram, saveAndFormat } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import {
  getDefaultProjectNameFromWorkspace,
  getSourceRoot,
  getWorkspace,
} from './workspace-utils';

export interface LibraryOptions {
  project: string;
  lazy: boolean;
  features?: string[];
}

export interface FeatureConfig {
  /**
   * The folder in which we will generate the feature module. E.g. app/spartacus/features/__organization__ (__NOTE__: just the `organization` part should be provided.).
   */
  folderName: string;
  /**
   * The feature name corresponds to the configuration feature name which is used if the `lazyModuleName` is not provided.
   * Also used as a name of the generated feature module file.
   */
  name: string;
  /**
   * The configuration name of the lazy loaded feature.
   */
  lazyModuleName?: string;
  /**
   * The feature module configuration.
   */
  featureModule: Module;
  /**
   * The root module configuration.
   */
  rootModule: Module;
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
  customConfig?: { import: Import[]; content: string };
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

export function shouldAddFeature(
  feature: string,
  features: string[] = []
): boolean {
  return features.includes(feature);
}

export function addLibraryFeature<T extends LibraryOptions>(
  options: T,
  config: FeatureConfig
): Rule {
  return (tree: Tree) => {
    const spartacusFeatureModuleExists = checkAppStructure(
      tree,
      options.project
    );
    if (!spartacusFeatureModuleExists) {
      throw new SchematicsException(
        'Please migrate manually to new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/ and add the library once again. Old app structure is no longer supported.'
      );
    }
    return chain([
      handleFeature(options, config),
      config.styles ? addLibraryStyles(config.styles, options) : noop(),
      config.assets ? addLibraryAssets(config.assets, options) : noop(),
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
  let result = false;
  for (const tsconfigPath of buildPaths) {
    if (spartacusFeatureModuleExists(tree, tsconfigPath, basePath)) {
      result = true;
      break;
    }
  }
  return result;
}

function spartacusFeatureModuleExists(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): boolean {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
    ) {
      if (getSpartacusFeaturesModule(sourceFile)) {
        return true;
      }
    }
  }
  return false;
}

function getSpartacusFeaturesModule(
  sourceFile: SourceFile
): CallExpression | undefined {
  let spartacusFeaturesModule;

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
  return (tree: Tree, _context: SchematicContext) => {
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const basePath = process.cwd();
    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      rules.push(
        ensureModuleExists({
          name: `${config.name}-feature`,
          path: `app/spartacus/features/${config.folderName}`,
          module: SPARTACUS_FEATURES_MODULE,
          project: options.project,
        })
      );
      rules.push(addRootModule(tsconfigPath, basePath, config));
      rules.push(addFeatureModule(tsconfigPath, basePath, config, options));
      rules.push(addFeatureTranslations(tsconfigPath, basePath, config));
      rules.push(addCustomConfig(tsconfigPath, basePath, config));
    }
    return chain(rules);
  };
}

function addRootModule(
  tsconfigPath: string,
  basePath: string,
  config: FeatureConfig
) {
  return (tree: Tree): Tree => {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    for (const sourceFile of appSourceFiles) {
      if (
        sourceFile
          .getFilePath()
          .includes(`${dasherize(config.name)}-feature.module.ts`)
      ) {
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

// TODO: Avoid duplication when running twice
function addFeatureModule(
  tsconfigPath: string,
  basePath: string,
  config: FeatureConfig,
  options: LibraryOptions
) {
  return (tree: Tree): Tree => {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    const moduleFileName = `${dasherize(config.name)}-feature.module.ts`;
    for (const sourceFile of appSourceFiles) {
      if (sourceFile.getFilePath().includes(moduleFileName)) {
        if (options.lazy) {
          addModuleProvider(sourceFile, {
            import: [
              {
                moduleSpecifier: SPARTACUS_CORE,
                namedImports: [PROVIDE_CONFIG_FUNCTION],
              },
            ],
            content: `${PROVIDE_CONFIG_FUNCTION}({
              featureModules: {
                ${config.lazyModuleName || config.name}: {
                  module: () =>
                    import('${
                      config.featureModule.importPath
                    }').then((m) => m.${config.featureModule.name}),
                },
              }
            })`,
          });
        } else {
          addModuleImport(sourceFile, {
            import: {
              moduleSpecifier: config.featureModule.importPath,
              namedImports: [config.featureModule.name],
            },
            content: config.featureModule.content || config.featureModule.name,
          });
        }
        saveAndFormat(sourceFile);
        break;
      }
    }
    return tree;
  };
}

// TODO: Avoid duplication when running twice
function addFeatureTranslations(
  tsconfigPath: string,
  basePath: string,
  config: FeatureConfig
) {
  return (tree: Tree): Tree => {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    const moduleFileName = `${dasherize(config.name)}-feature.module.ts`;
    for (const sourceFile of appSourceFiles) {
      if (sourceFile.getFilePath().includes(moduleFileName)) {
        if (config.i18n) {
          addModuleProvider(sourceFile, {
            import: [
              {
                moduleSpecifier: SPARTACUS_CORE,
                namedImports: [PROVIDE_CONFIG_FUNCTION],
              },
              {
                moduleSpecifier: config.i18n.importPath,
                namedImports: [config.i18n.chunks, config.i18n.resources],
              },
            ],
            content: `${PROVIDE_CONFIG_FUNCTION}({
              i18n: {
                resources: ${config.i18n.resources},
                chunks: ${config.i18n.chunks},
              },
            })`,
          });
          saveAndFormat(sourceFile);
        }
        break;
      }
    }
    return tree;
  };
}

// TODO: Avoid duplication when running twice
function addCustomConfig(
  tsconfigPath: string,
  basePath: string,
  config: FeatureConfig
) {
  return (tree: Tree): Tree => {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    const moduleFileName = `${dasherize(config.name)}-feature.module.ts`;
    for (const sourceFile of appSourceFiles) {
      if (sourceFile.getFilePath().includes(moduleFileName)) {
        if (config.customConfig) {
          addModuleProvider(sourceFile, {
            import: [
              {
                moduleSpecifier: SPARTACUS_CORE,
                namedImports: [PROVIDE_CONFIG_FUNCTION],
              },
              ...config.customConfig.import,
            ],
            content: `${PROVIDE_CONFIG_FUNCTION}(${config.customConfig.content})`,
          });
          saveAndFormat(sourceFile);
        }
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
    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
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
  return (tree: Tree, context: SchematicContext) => {
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);
    const project = options.project || defaultProject;
    const libraryScssPath = `${getSourceRoot(tree, {
      project: project,
    })}/styles/spartacus/${stylingConfig.scssFileName}`;
    if (tree.exists(libraryScssPath)) {
      context.logger.info(
        `Skipping the creation of '${libraryScssPath}', as it already exists.`
      );
      return noop();
    }

    tree.create(libraryScssPath, `@import "${stylingConfig.importStyle}";`);

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

export function configureB2bFeatures<T extends LibraryOptions>(
  options: T,
  packageJson: any
): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
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
      installPackageJsonDependencies(),
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
          sourceFile
            .getFilePath()
            .includes(`${SPARTACUS_CONFIGURATION_MODULE}.module.ts`)
        ) {
          getB2bConfiguration().forEach((provider) =>
            addModuleProvider(sourceFile, provider)
          );
          saveAndFormat(sourceFile);

          break;
        }
      }
    }

    return tree;
  };
}
