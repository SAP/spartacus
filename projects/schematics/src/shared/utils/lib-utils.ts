import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
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
import { ANGULAR_CORE, SPARTACUS_FEATURES_MODULE } from '../constants';
import { isImportedFrom } from './import-utils';
import { addModuleImport, ensureModuleExists } from './new-module-utils';
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
      config.styles ? addLibraryStyles(config.styles) : noop(),
      config.assets ? addLibraryAssets(config.assets) : noop(),
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
        featureModuleAlreadyExists(tree, tsconfigPath, basePath, config.name)
      );
      tasks.push(
        ensureModuleExists({
          name: `${config.name}-feature`,
          path: 'app/spartacus/features',
          module: SPARTACUS_FEATURES_MODULE,
          project: options.project,
        })
      );
      tasks.push(addRootModule(tsconfigPath, basePath, config));
    }
    // const changes: Change[] = [];

    // if (
    //   config.defaultConfig &&
    //   !isImported(
    //     getTsSourceFile(host, appModulePath),
    //     PROVIDE_DEFAULT_CONFIG,
    //     SPARTACUS_CORE
    //   )
    // ) {
    //   const coreImportChange = createImportChange(
    //     host,
    //     appModulePath,
    //     PROVIDE_DEFAULT_CONFIG,
    //     SPARTACUS_CORE
    //   );
    //   changes.push(coreImportChange);

    //   const providersChanges = addToModuleProviders(
    //     host,
    //     appModulePath,
    //     `${PROVIDE_DEFAULT_CONFIG}(${config.defaultConfig.name}),`,
    //     getTsSourceFile(host, appModulePath)
    //   );
    //   changes.push(...providersChanges);
    // }

    // if (config.defaultConfig) {
    //   const setupImportChange = createImportChange(
    //     host,
    //     appModulePath,
    //     config.defaultConfig.name,
    //     config.defaultConfig.importPath
    //   );
    //   changes.push(setupImportChange);
    // }

    // import root module
    // if (
    //   !isImported(
    //     getTsSourceFile(host, appModulePath),
    //     config.rootModule.name,
    //     config.rootModule.importPath
    //   )
    // ) {
    //   const rootModuleImportChange = createImportChange(
    //     host,
    //     appModulePath,
    //     config.rootModule.name,
    //     config.rootModule.importPath
    //   );
    //   const rootModuleAddedToImportsChanges = addToModuleImports(
    //     host,
    //     appModulePath,
    //     config.rootModule.name
    //   );
    //   changes.push(rootModuleImportChange, ...rootModuleAddedToImportsChanges);
    // }

    // if (config.i18n) {
    //   const i18nChanges = provideI18NConfig(
    //     host,
    //     getTsSourceFile(host, appModulePath),
    //     config.i18n
    //   );
    //   changes.push(...i18nChanges);
    // }

    // if (options.lazy) {
    //   const lazyLoadingChange = mergeLazyLoadingConfig(
    //     context,
    //     getTsSourceFile(host, appModulePath),
    //     {
    //       name: config.name,
    //       module: config.featureModule,
    //     }
    //   );
    //   changes.push(lazyLoadingChange);
    // } else {
    //   if (
    //     !isImported(
    //       getTsSourceFile(host, appModulePath),
    //       config.featureModule.name,
    //       config.featureModule.importPath
    //     )
    //   ) {
    //     const featureModuleImportChange = createImportChange(
    //       host,
    //       appModulePath,
    //       config.featureModule.name,
    //       config.featureModule.importPath
    //     );
    //     changes.push(featureModuleImportChange);
    //   }

    //   const addedToImportsChanges = addToModuleImports(
    //     host,
    //     appModulePath,
    //     config.featureModule.name
    //   );
    //   changes.push(...addedToImportsChanges);
    // }

    // commitChanges(host, appModulePath, changes);
    return chain(tasks);
  };
}

function featureModuleAlreadyExists(
  tree: Tree,
  tsconfigPath: string,
  basePath: string,
  name: string
) {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
  appSourceFiles.forEach((sourceFile) => {
    if (
      sourceFile.getFilePath().includes(`${dasherize(name)}-feature.module.ts`)
    ) {
      if (getFeatureModule(sourceFile, name)) {
        throw new SchematicsException(
          `Module ${classify(
            name
          )}FeatureModule already exists. Assuming that the feature library is already installed.`
        );
      }
    }
  });
  return noop();
}

function getFeatureModule(
  sourceFile: SourceFile,
  name: string
): CallExpression | undefined {
  let featureModule;

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
            identifier.getText() === `${classify(name)}FeatureModule`
          ) {
            featureModule = node;
          }
        }
      }
    }

    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return featureModule;
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
          content: config.rootModule.name,
        });
        saveAndFormat(sourceFile);
      }
    });
    return tree;
  };
}

// function mergeLazyLoadingConfig(
//   context: SchematicContext,
//   moduleSource: ts.SourceFile,
//   config: {
//     name: string;
//     module: Module;
//   }
// ): Change {
//   const storefrontConfig = getExistingStorefrontConfigNode(moduleSource);
//   const lazyLoadingModule = `module: () => import('${config.module.importPath}').then(
//           (m) => m.${config.module.name}
//         ),`;
//   const lazyLoadingFeatureModule = `featureModules: {
//         ${config.name}: {
//           ${lazyLoadingModule}
//         },
//       }`;

//   if (!storefrontConfig) {
//     context.logger
//       .warn(`Storefront config not detected in ${moduleSource.fileName}, unable to configure lazy loading.
// Please manually append the following configuration:

// ${lazyLoadingFeatureModule}
// `);
//     return new NoopChange();
//   }

//   const currentFeatureModulesConfig = getConfig(
//     storefrontConfig,
//     'featureModules'
//   );
//   if (!currentFeatureModulesConfig) {
//     const syntaxListNode = findNodes(
//       storefrontConfig,
//       ts.SyntaxKind.SyntaxList,
//       1,
//       true
//     )[0] as ts.SyntaxList;
//     const objectLiteralExpression = findNodes(
//       syntaxListNode,
//       ts.SyntaxKind.ObjectLiteralExpression,
//       1,
//       true
//     )[0] as ts.ObjectLiteralExpression;

//     const change = createNewConfig(
//       moduleSource.fileName,
//       objectLiteralExpression,
//       '',
//       lazyLoadingFeatureModule
//     );
//     return change;
//   }

//   let configChange = `{
//     ${lazyLoadingModule}
// }
// `;

//   const featureModuleConfig = getConfig(
//     currentFeatureModulesConfig,
//     config.name
//   );
//   if (featureModuleConfig) {
//     const lazyLoadConfig = getConfig(featureModuleConfig, 'module');
//     if (lazyLoadConfig) {
//       return new NoopChange();
//     }
//     configChange = lazyLoadingModule;

//     const nestedProperty = findNodes(
//       featureModuleConfig,
//       ts.SyntaxKind.PropertyAssignment,
//       1,
//       true
//     )[0] as ts.PropertyAssignment;
//     return createNewConfig(
//       moduleSource.fileName,
//       nestedProperty,
//       config.name,
//       configChange
//     );
//   } else {
//     return createNewConfig(
//       moduleSource.fileName,
//       currentFeatureModulesConfig,
//       config.name,
//       `{
//         ${lazyLoadingModule}
//         }`
//     );
//   }
// }

// function provideI18NConfig(
//   host: Tree,
//   source: ts.SourceFile,
//   i18nConfig: I18NConfig
// ): Change[] {
//   const changes: Change[] = [];
//   if (!isImported(source, PROVIDE_CONFIG_FUNCTION, SPARTACUS_CORE)) {
//     const importChange = createImportChange(
//       host,
//       source.fileName,
//       PROVIDE_CONFIG_FUNCTION,
//       SPARTACUS_CORE
//     );
//     changes.push(importChange);
//   }

//   if (
//     !isImported(source, i18nConfig.resources, i18nConfig.importPath) &&
//     !isImported(source, i18nConfig.chunks, i18nConfig.importPath)
//   ) {
//     const resourceImportChange = createImportChange(
//       host,
//       source.fileName,
//       i18nConfig.resources,
//       i18nConfig.importPath
//     );
//     const chunkImportChange = createImportChange(
//       host,
//       source.fileName,
//       i18nConfig.chunks,
//       i18nConfig.importPath
//     );

//     const providersChanges = addToModuleProviders(
//       host,
//       source.fileName,
//       `
//     ${PROVIDE_CONFIG_FUNCTION}({
//       i18n: {
//         resources: ${i18nConfig.resources},
//         chunks: ${i18nConfig.chunks},
//       },
//     })`
//     );

//     changes.push(resourceImportChange, chunkImportChange, ...providersChanges);
//   }

//   return changes;
// }

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
