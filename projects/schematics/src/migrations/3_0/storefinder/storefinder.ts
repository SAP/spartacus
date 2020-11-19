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
  findNodes,
  getDecoratorMetadata,
  getMetadataField,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  NoopChange,
  RemoveChange,
} from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import * as ts from 'typescript';
import {
  addToModuleImports,
  addToModuleProviders,
  ANGULAR_CORE,
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  CLI_STOREFINDER_FEATURE,
  commitChanges,
  createImportChange,
  createNewConfig,
  getConfig,
  getDefaultProjectNameFromWorkspace,
  getExistingStorefrontConfigNode,
  getSourceRoot,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  getWorkspace,
  PROVIDE_CONFIG_FUNCTION,
  readPackageJson,
  removeImport,
  SPARTACUS_CORE,
  SPARTACUS_MISC,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  SPARTACUS_STOREFRONTLIB,
  STOREFINDER_FEATURE_NAME,
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_TRANSLATIONS,
  STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
  STOREFRONT_MODULE,
} from '../../../shared/index';
import {
  getAngularJsonFile,
  validateSpartacusInstallation,
} from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return async (tree: Tree) => {
    const packageJson = readPackageJson(tree);

    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const angularJson = getAngularJsonFile(tree);
    const mainPath =
      angularJson.projects[projectName]?.architect?.build?.options?.main;
    if (!mainPath) {
      throw new SchematicsException(`No main path specified in angular.json.`);
    }
    const appModulePath = getAppModulePath(tree, mainPath);

    return (await isStorefinderPresent(tree, packageJson, appModulePath))
      ? chain([
          removeOldSetup(appModulePath),

          addStorefinderPackageJsonDependencies(packageJson),
          addStorefinderFeature(appModulePath),
          addStorefinderStyles(),
          installPackageJsonDependencies(),
        ])
      : noop();
  };
}

async function isStorefinderPresent(
  tree: Tree,
  packageJson: any,
  appModulePath: string
): Promise<boolean> {
  validateSpartacusInstallation(packageJson);
  const appModuleSource = getTsSourceFile(tree, appModulePath);
  return (
    isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB) ||
    isImported(appModuleSource, STOREFRONT_MODULE, SPARTACUS_STOREFRONTLIB)
  );
}

function removeOldSetup(appModulePath: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const appModuleSource = getTsSourceFile(tree, appModulePath);

    const changes: Change[] = [];
    if (
      isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB)
    ) {
      const importRemovalChanges = removeImport(appModuleSource, {
        className: STOREFINDER_MODULE,
        importPath: SPARTACUS_STOREFRONTLIB,
      });
      changes.push(importRemovalChanges);

      const node = getDecoratorMetadata(
        appModuleSource,
        'NgModule',
        ANGULAR_CORE
      )[0];
      const assignment = getMetadataField(
        node as ts.ObjectLiteralExpression,
        'imports'
      )[0] as ts.PropertyAssignment;
      const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
      if (arrLiteral.elements.length !== 0) {
        arrLiteral.elements.every((el) => {
          if (el.getText() === STOREFINDER_MODULE) {
            const removeFromModulesArrayChange = new RemoveChange(
              appModulePath,
              el.getStart(),
              `${STOREFINDER_MODULE},`
            );
            changes.push(removeFromModulesArrayChange);
            return false;
          }

          return el;
        });
      }
    }

    commitChanges(tree, appModulePath, changes);
  };
}

// function addPackageJsonDependencies(): Rule {
//   return (tree: Tree, context: SchematicContext) => {
//     const miscVersion = getSpartacusSchematicsVersion();
//     const dependencies: NodeDependency[] = [
//       {
//         type: NodeDependencyType.Default,
//         version: miscVersion,
//         name: SPARTACUS_MISC,
//       },
//     ];

//     dependencies.forEach((dependency) => {
//       addPackageJsonDependency(tree, dependency);
//       context.logger.log(
//         'info',
//         `✅️ Added '${dependency.name}' into ${dependency.type}`
//       );
//     });

//     return tree;
//   };
// }

interface FeatureConfig {
  name: string;
  featureModule: Module;
  rootModule: Module;
  i18n: I18NConfig;
}

interface Module {
  name: string;
  importPath: string;
}

interface I18NConfig {
  resources: string;
  chunks: string;
  importPath: string;
}

function addStorefinderFeature(appModulePath: string): Rule {
  return handleFeature(
    appModulePath,
    { lazy: false, features: [CLI_STOREFINDER_FEATURE] },
    {
      name: STOREFINDER_FEATURE_NAME,
      featureModule: {
        name: STOREFINDER_MODULE,
        importPath: SPARTACUS_STOREFINDER,
      },
      rootModule: {
        name: STOREFINDER_ROOT_MODULE,
        importPath: SPARTACUS_STOREFINDER_ROOT,
      },
      i18n: {
        resources: STOREFINDER_TRANSLATIONS,
        chunks: STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
        importPath: SPARTACUS_STOREFINDER_ASSETS,
      },
    }
  );
}

function addStorefinderPackageJsonDependencies(packageJson: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion(tree)}`;

    const spartacusStorefinderDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_MISC,
    };
    addPackageJsonDependency(tree, spartacusStorefinderDependency);
    context.logger.info(
      `✅️ Added '${spartacusStorefinderDependency.name}' into ${spartacusStorefinderDependency.type}`
    );

    if (!packageJson.dependencies.hasOwnProperty(SPARTACUS_SETUP)) {
      const spartacusSetupDependency: NodeDependency = {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: SPARTACUS_SETUP,
      };

      addPackageJsonDependency(tree, spartacusSetupDependency);
      context.logger.info(
        `✅️ Added '${spartacusSetupDependency.name}' into ${spartacusSetupDependency.type}`
      );
    }

    return tree;
  };
}

function addStorefinderStyles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const storefinderScssPath = `${getSourceRoot(
      tree
    )}/styles/spartacus/storefinder.scss`;
    if (tree.exists(storefinderScssPath)) {
      context.logger.info(
        `Skipping the creation of '${storefinderScssPath}', as it already exists.`
      );
      return noop();
    }

    tree.create(storefinderScssPath, `@import "${SPARTACUS_MISC}";`);

    const { path, workspace: angularJson } = getWorkspace(tree);
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);

    const architect = angularJson.projects[defaultProject].architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildOptions = {
      ...architectBuild?.options,
      styles: [
        ...(architectBuild?.options?.styles
          ? architectBuild?.options?.styles
          : []),
        storefinderScssPath,
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
        storefinderScssPath,
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

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}

function handleFeature(
  appModulePath: string,
  options: any,
  config: FeatureConfig
): Rule {
  return (host: Tree, context: SchematicContext) => {
    const changes: Change[] = [];

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

    const i18nChanges = provideI18NConfig(
      host,
      getTsSourceFile(host, appModulePath),
      config.i18n
    );
    changes.push(...i18nChanges);

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
  let storefrontConfig = getExistingStorefrontConfigNode(
    moduleSource,
    B2C_STOREFRONT_MODULE
  );
  storefrontConfig =
    storefrontConfig ||
    getExistingStorefrontConfigNode(moduleSource, B2B_STOREFRONT_MODULE);

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
