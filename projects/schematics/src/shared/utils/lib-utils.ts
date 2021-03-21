import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
} from '@schematics/angular/utility/dependencies';
import { CallExpression, Node, SourceFile, ts as tsMorph } from 'ts-morph';
import {
  ANGULAR_CORE,
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
} from '../constants';
import { isImportedFrom } from './import-utils';
import {
  addModuleImport,
  addModuleProvider,
  ensureModuleExists,
  Import,
} from './new-module-utils';
import { createProgram, saveAndFormat } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
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
  lazyModuleName?: string;
  featureModule: Module;
  rootModule: Module;
  i18n?: I18NConfig;
  customConfig?: { import: Import[]; content: string };
  styles?: StylingConfig;
  assets?: AssetsConfig;
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

export function shouldAddFeature(features: string[], feature: string): boolean {
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
    if (spartacusFeatureModuleExists) {
      throw new SchematicsException(
        'Your application structure is not supported. Migrate manually to new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/ and add the library once again.'
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
      "Could not find any tsconfig file. Can't find SpartacusFeaturesModule."
    );
  }

  const basePath = process.cwd();
  let result = false;
  for (const tsconfigPath of buildPaths) {
    if (spartacusFeatureModuleExists(tree, tsconfigPath, basePath)) {
      result = true;
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

  appSourceFiles.forEach((sourceFile) => {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
    ) {
      if (getSpartacusFeaturesModule(sourceFile)) {
        return true;
      }
    }
  });
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
            identifier.getText() === 'SpartacusFeaturesModule'
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

    if (!buildPaths.length) {
      throw new SchematicsException(
        "Could not find any tsconfig file. Can't find SpartacusFeaturesModule."
      );
    }

    const basePath = process.cwd();
    const tasks = [];
    for (const tsconfigPath of buildPaths) {
      tasks.push(
        ensureModuleExists({
          name: `${config.name}-feature`,
          path: 'app/spartacus/features',
          module: SPARTACUS_FEATURES_MODULE,
          project: options.project,
        })
      );
      tasks.push(addRootModule(tsconfigPath, basePath, config));
      tasks.push(addFeatureModule(tsconfigPath, basePath, config, options));
      tasks.push(addFeatureTranslations(tsconfigPath, basePath, config));
      tasks.push(addCustomConfig(tsconfigPath, basePath, config));
    }
    return chain(tasks);
  };
}

function addRootModule(
  tsconfigPath: string,
  basePath: string,
  config: FeatureConfig
) {
  return (tree: Tree): Tree => {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    appSourceFiles.forEach((sourceFile) => {
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
      }
    });
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
    appSourceFiles.forEach((sourceFile) => {
      if (
        sourceFile
          .getFilePath()
          .includes(`${dasherize(config.name)}-feature.module.ts`)
      ) {
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
      }
    });
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
    appSourceFiles.forEach((sourceFile) => {
      if (
        sourceFile
          .getFilePath()
          .includes(`${dasherize(config.name)}-feature.module.ts`)
      ) {
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
      }
    });
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
    appSourceFiles.forEach((sourceFile) => {
      if (
        sourceFile
          .getFilePath()
          .includes(`${dasherize(config.name)}-feature.module.ts`)
      ) {
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
      }
    });
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

export function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
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
