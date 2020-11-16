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
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
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
  getProjectTargets,
  getSourceRoot,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  getWorkspace,
  PROVIDE_CONFIG_FUNCTION,
  PROVIDE_DEFAULT_CONFIG,
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
  ORDER_APPROVAL_TRANSLATIONS,
  ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
  ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
  ORGANIZATION_TRANSLATIONS,
  ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_ADMINISTRATION,
  SPARTACUS_ADMINISTRATION_ASSETS,
  SPARTACUS_ADMINISTRATION_ROOT,
  SPARTACUS_ORDER_APPROVAL,
  SPARTACUS_ORDER_APPROVAL_ASSETS,
  SPARTACUS_ORDER_APPROVAL_ROOT,
  SPARTACUS_ORGANIZATION,
} from '../constants';
import { Schema as SpartacusOrganizationOptions } from './schema';

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

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options);

    return chain([
      addPackageJsonDependencies(packageJson),
      shouldAddFeature(options.features, CLI_ADMINISTRATION_FEATURE)
        ? addAdministrationFeature(appModulePath, options)
        : noop(),
      shouldAddFeature(options.features, CLI_ORDER_APPROVAL_FEATURE)
        ? addOrderApprovalsFeature(appModulePath, options)
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

function getAppModule(
  host: Tree,
  options: SpartacusOrganizationOptions
): string {
  const projectTargets = getProjectTargets(host, options.project);

  if (!projectTargets.build) {
    throw new SchematicsException(`Project target "build" not found.`);
  }

  const mainPath = projectTargets.build.options.main;
  return getAppModulePath(host, mainPath);
}

function addAdministrationFeature(
  appModulePath: string,
  options: SpartacusOrganizationOptions
): Rule {
  return handleFeature(appModulePath, options, {
    name: ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
    featureModule: {
      name: ADMINISTRATION_MODULE,
      importPath: SPARTACUS_ADMINISTRATION,
    },
    rootModule: {
      name: ADMINISTRATION_ROOT_MODULE,
      importPath: SPARTACUS_ADMINISTRATION_ROOT,
    },
    i18n: {
      resources: ORGANIZATION_TRANSLATIONS,
      chunks: ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ADMINISTRATION_ASSETS,
    },
  });
}

function addOrderApprovalsFeature(
  appModulePath: string,
  options: SpartacusOrganizationOptions
): Rule {
  return handleFeature(appModulePath, options, {
    name: ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
    featureModule: {
      name: ORDER_APPROVAL_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL,
    },
    rootModule: {
      name: ORDER_APPROVAL_ROOT_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL_ROOT,
    },
    i18n: {
      resources: ORDER_APPROVAL_TRANSLATIONS,
      chunks: ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ORDER_APPROVAL_ASSETS,
    },
  });
}

function handleFeature(
  appModulePath: string,
  options: SpartacusOrganizationOptions,
  config: FeatureConfig
): Rule {
  return (host: Tree, context: SchematicContext) => {
    const changes: Change[] = [];

    if (
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
        `${PROVIDE_DEFAULT_CONFIG}(${DEFAULT_B2B_OCC_CONFIG}),`,
        getTsSourceFile(host, appModulePath)
      );
      changes.push(...providersChanges);
    }
    if (
      !isImported(
        getTsSourceFile(host, appModulePath),
        DEFAULT_B2B_OCC_CONFIG,
        SPARTACUS_SETUP
      )
    ) {
      const setupImportChange = createImportChange(
        host,
        appModulePath,
        DEFAULT_B2B_OCC_CONFIG,
        SPARTACUS_SETUP
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
