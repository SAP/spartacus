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
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  addImport,
  addToModuleImportsAndCommitChanges,
  addToModuleProviders,
  commitChanges,
  DEFAULT_B2B_OCC_CONFIG,
  getDefaultProjectNameFromWorkspace,
  getProjectTargets,
  getSourceRoot,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  getWorkspace,
  ORGANIZATION_MODULE,
  PROVIDE_DEFAULT_CONFIG,
  SPARTACUS_CORE,
  SPARTACUS_MY_ACCOUNT,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_SETUP,
  UTF_8,
} from '@spartacus/schematics';
import { Schema as MyAccountOptions } from './schema';

export function addSpartacusMyAccount(options: MyAccountOptions): Rule {
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
      name: SPARTACUS_MY_ACCOUNT,
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
    )}/styles/spartacus-my-account.scss`;
    if (tree.exists(myAccountScssPath)) {
      context.logger.info(
        `Skipping '${myAccountScssPath}' as it already exists.`
      );
      return noop();
    }

    tree.create(myAccountScssPath, `@import "${SPARTACUS_MY_ACCOUNT}";`);

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

function updateAppModule(options: MyAccountOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);
    const moduleSource = getTsSourceFile(host, modulePath);

    const providersChanges = addToModuleProviders(
      host,
      modulePath,
      `${PROVIDE_DEFAULT_CONFIG}(${DEFAULT_B2B_OCC_CONFIG})`,
      moduleSource
    );
    commitChanges(host, modulePath, providersChanges);

    addImport(host, modulePath, PROVIDE_DEFAULT_CONFIG, SPARTACUS_CORE);
    addImport(host, modulePath, DEFAULT_B2B_OCC_CONFIG, SPARTACUS_SETUP);
    addImport(host, modulePath, ORGANIZATION_MODULE, SPARTACUS_ORGANIZATION);

    addToModuleImportsAndCommitChanges(host, modulePath, ORGANIZATION_MODULE);
  };
}
