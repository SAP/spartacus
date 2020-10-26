import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { findNodes } from '@schematics/angular/utility/ast-utils';
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
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
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
  mergeConfig,
  PROVIDE_DEFAULT_CONFIG,
  SPARTACUS_ADMINISTRATION,
  SPARTACUS_ADMINISTRATION_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_SETUP,
  UTF_8,
} from '@spartacus/schematics';
import * as ts from 'typescript';
import { Schema as SpartacusOrganizationOptions } from './schema';

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependencies(packageJson),
      updateAppModule(options),
      addStyles(),
      installPackageJsonDependencies(),
    ]);
  };
}

function addPackageJsonDependencies(packageJson: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;

    const spartacusMyAccountDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ORGANIZATION,
    };
    addPackageJsonDependency(tree, spartacusMyAccountDependency);
    context.logger.info(
      `✅️ Added '${spartacusMyAccountDependency.name}' into ${spartacusMyAccountDependency.type}`
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
    )}/styles/spartacus-organization.scss`;
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

function updateAppModule(options: SpartacusOrganizationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);

    const changes: Change[] = [];
    const providersChanges = addToModuleProviders(
      host,
      modulePath,
      `${PROVIDE_DEFAULT_CONFIG}(${DEFAULT_B2B_OCC_CONFIG})`,
      getTsSourceFile(host, modulePath)
    );
    changes.push(...providersChanges);

    const coreImportChange = createImportChange(
      host,
      modulePath,
      PROVIDE_DEFAULT_CONFIG,
      SPARTACUS_CORE
    );
    const setupImportChange = createImportChange(
      host,
      modulePath,
      DEFAULT_B2B_OCC_CONFIG,
      SPARTACUS_SETUP
    );
    changes.push(coreImportChange, setupImportChange);

    if (options.lazy) {
      const lazyLoadingChange = mergeLazyLoadingConfig(
        context,
        getTsSourceFile(host, modulePath)
      );
      changes.push(lazyLoadingChange);

      const administrationImportChange = createImportChange(
        host,
        modulePath,
        ADMINISTRATION_MODULE,
        SPARTACUS_ADMINISTRATION
      );

      const moduleImportChanges = addToModuleImports(
        host,
        modulePath,
        ADMINISTRATION_MODULE
      );
      changes.push(administrationImportChange, ...moduleImportChanges);
    } else {
      const administrationRootImportChange = createImportChange(
        host,
        modulePath,
        ADMINISTRATION_ROOT_MODULE,
        SPARTACUS_ADMINISTRATION_ROOT
      );
      changes.push(administrationRootImportChange);

      const moduleImportChanges = addToModuleImports(
        host,
        modulePath,
        ADMINISTRATION_ROOT_MODULE
      );
      changes.push(...moduleImportChanges);
    }

    commitChanges(host, modulePath, changes);
  };
}

function mergeLazyLoadingConfig(
  context: SchematicContext,
  moduleSource: ts.SourceFile
): Change {
  const storefrontConfig = getExistingStorefrontConfigNode(moduleSource);

  if (!storefrontConfig) {
    context.logger
      .warn(`Storefront config not detected in ${moduleSource.fileName}, unable to configure lazy loading.
Please manually append the following configuration:

featureModules: {
  organizationAdministration: {
    module: () =>
    import('@spartacus/organization/administration').then(
      (m) => m.AdministrationModule
    ),
  },
},
`);
    return new NoopChange();
  }

  const currentFeatureModulesConfig = getConfig(
    storefrontConfig,
    'featureModules'
  );

  if (currentFeatureModulesConfig) {
    return mergeConfig(
      moduleSource.fileName,
      currentFeatureModulesConfig,
      'organizationAdministration',
      `{
  module: () =>
    import('@spartacus/organization/administration').then(
      (m) => m.AdministrationModule
    )
  }`
    );
  }

  const syntaxListNodes = findNodes(
    storefrontConfig,
    ts.SyntaxKind.SyntaxList,
    1,
    true
  )[0] as ts.SyntaxList;

  const change = createNewConfig(
    moduleSource.fileName,
    syntaxListNodes,
    '',
    `\nfeatureModules: {
        organizationAdministration: {
          module: () =>
            import('@spartacus/organization/administration').then(
              (m) => m.AdministrationModule
            ),
        }
      }`
  );
  change.pos = change.pos + 1;
  return change;
}
