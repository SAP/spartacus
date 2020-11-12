import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { findNodes, isImported } from '@schematics/angular/utility/ast-utils';
import { Change, NoopChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addToModuleImports,
  addToModuleProviders,
  commitChanges,
  createImportChange,
  createNewConfig,
  DEFAULT_B2B_OCC_CONFIG,
  getConfig,
  getDefaultProjectNameFromWorkspace,
  getExistingStorefrontConfigNode,
  getSourceRoot,
  getSpartacusConfigurationFilePath,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  getWorkspace,
  PROVIDE_DEFAULT_CONFIG,
  retrieveAppModulePath,
  SPARTACUS_CORE,
  SPARTACUS_SETUP,
  UTF_8,
} from '@spartacus/schematics';
import * as ts from 'typescript';
import {
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
  CLI_ADMINISTRATION_FEATURE,
  CLI_ORDER_APPROVAL_FEATURE,
  ORDER_APPROVAL_MODULE,
  ORDER_APPROVAL_ROOT_MODULE,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
  ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
  SPARTACUS_ADMINISTRATION,
  SPARTACUS_ADMINISTRATION_ROOT,
  SPARTACUS_ORDER_APPROVAL,
  SPARTACUS_ORDER_APPROVAL_ROOT,
  SPARTACUS_ORGANIZATION,
} from '../constants';
import { Schema as SpartacusOrganizationOptions } from './schema';

interface FeatureConfig {
  name: string;
  featureModule: Module;
  rootModule: Module;
}

interface Module {
  name: string;
  importPath: string;
}

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const {
      path: configurationFile,
      isAppModule,
    } = getSpartacusConfigurationFilePath(tree, options.project);
    const appModulePath = isAppModule
      ? configurationFile
      : retrieveAppModulePath(tree, options.project);

    return chain([
      addPackageJsonDependencies(packageJson),
      shouldAddFeature(options.features, CLI_ADMINISTRATION_FEATURE)
        ? addAdministrationFeature(configurationFile, appModulePath, options)
        : noop(),
      shouldAddFeature(options.features, CLI_ORDER_APPROVAL_FEATURE)
        ? addOrderApprovalsFeature(configurationFile, appModulePath, options)
        : noop(),
      addStyles(),
      installPackageJsonDependencies(),
    ]);
  };
}

function shouldAddFeature(features: string[], feature: string): boolean {
  return features.includes(feature);
}

function addPackageJsonDependencies(packageJson: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;

    const spartacusOrganizationDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ORGANIZATION,
    };
    addPackageJsonDependency(tree, spartacusOrganizationDependency);
    context.logger.info(
      `✅️ Added '${spartacusOrganizationDependency.name}' into ${spartacusOrganizationDependency.type}`
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

function validateSpartacusInstallation(packageJson: any): void {
  if (!packageJson.dependencies.hasOwnProperty(SPARTACUS_CORE)) {
    throw new SchematicsException(
      `Spartacus is not detected. Please first install Spartacus by running: 'ng add @spartacus/schematics'.
    To see more options, please check our documentation.`
    );
  }
}

function addStyles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const myAccountScssPath = `${getSourceRoot(
      tree
    )}/styles/spartacus/organization.scss`;
    if (tree.exists(myAccountScssPath)) {
      context.logger.info(
        `Skipping the creation of '${myAccountScssPath}', as it already exists.`
      );
      return noop();
    }

    tree.create(myAccountScssPath, `@import "${SPARTACUS_ORGANIZATION}";`);

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
        myAccountScssPath,
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
        myAccountScssPath,
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

function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}

function addAdministrationFeature(
  configurationFilePath: string,
  appModulePath: string,
  options: SpartacusOrganizationOptions
): Rule {
  return handleFeature(configurationFilePath, appModulePath, options, {
    name: ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
    featureModule: {
      name: ADMINISTRATION_MODULE,
      importPath: SPARTACUS_ADMINISTRATION,
    },
    rootModule: {
      name: ADMINISTRATION_ROOT_MODULE,
      importPath: SPARTACUS_ADMINISTRATION_ROOT,
    },
  });
}

function addOrderApprovalsFeature(
  configurationFilePath: string,
  appModulePath: string,
  options: SpartacusOrganizationOptions
): Rule {
  return handleFeature(configurationFilePath, appModulePath, options, {
    name: ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
    featureModule: {
      name: ORDER_APPROVAL_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL,
    },
    rootModule: {
      name: ORDER_APPROVAL_ROOT_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL_ROOT,
    },
  });
}

function handleFeature(
  configurationFilePath: string,
  appModulePath: string,
  options: SpartacusOrganizationOptions,
  config: FeatureConfig
): Rule {
  return (host: Tree, context: SchematicContext) => {
    const configurationFile = getTsSourceFile(host, configurationFilePath);
    const appModule = getTsSourceFile(host, appModulePath);

    const appModuleChanges: Change[] = [];
    const configurationFileChanges: Change[] = [];
    const providersChanges = addToModuleProviders(
      host,
      appModule.fileName,
      `${PROVIDE_DEFAULT_CONFIG}(${DEFAULT_B2B_OCC_CONFIG})`,
      getTsSourceFile(host, appModule.fileName)
    );
    appModuleChanges.push(...providersChanges);

    if (!isImported(appModule, PROVIDE_DEFAULT_CONFIG, SPARTACUS_CORE)) {
      const coreImportChange = createImportChange(
        host,
        appModule.fileName,
        PROVIDE_DEFAULT_CONFIG,
        SPARTACUS_CORE
      );
      appModuleChanges.push(coreImportChange);
    }
    if (!isImported(appModule, DEFAULT_B2B_OCC_CONFIG, SPARTACUS_SETUP)) {
      const setupImportChange = createImportChange(
        host,
        appModule.fileName,
        DEFAULT_B2B_OCC_CONFIG,
        SPARTACUS_SETUP
      );
      appModuleChanges.push(setupImportChange);
    }

    // import root module
    if (
      !isImported(
        appModule,
        config.rootModule.name,
        config.rootModule.importPath
      )
    ) {
      const rootModuleImportChange = createImportChange(
        host,
        appModule.fileName,
        config.rootModule.name,
        config.rootModule.importPath
      );
      const rootModuleAddedToImportsChanges = addToModuleImports(
        host,
        appModule.fileName,
        config.rootModule.name
      );
      appModuleChanges.push(
        rootModuleImportChange,
        ...rootModuleAddedToImportsChanges
      );
    }

    if (options.lazy) {
      const lazyLoadingChange = mergeLazyLoadingConfig(
        context,
        configurationFile,
        {
          name: config.name,
          module: config.featureModule,
        }
      );

      appModulePath === configurationFilePath
        ? appModuleChanges.push(lazyLoadingChange)
        : configurationFileChanges.push(lazyLoadingChange);
    } else {
      if (
        !isImported(
          appModule,
          config.featureModule.name,
          config.featureModule.importPath
        )
      ) {
        const featureModuleImportChange = createImportChange(
          host,
          appModule.fileName,
          config.featureModule.name,
          config.featureModule.importPath
        );
        appModuleChanges.push(featureModuleImportChange);
      }

      const addedToImportsChanges = addToModuleImports(
        host,
        appModule.fileName,
        config.featureModule.name
      );
      appModuleChanges.push(...addedToImportsChanges);
    }

    commitChanges(host, appModule.fileName, appModuleChanges);
    commitChanges(host, configurationFile.fileName, configurationFileChanges);
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
  const lazyLoadingModule = `
    module: () => import('${config.module.importPath}').then(
      (m) => m.${config.module.name}
    ),
`;
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
    const change = createNewConfig(
      moduleSource.fileName,
      storefrontConfig,
      '',
      `\n${lazyLoadingFeatureModule}`
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
