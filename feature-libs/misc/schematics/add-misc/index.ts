import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addLibraryFeature,
  getAppModule,
  getSpartacusSchematicsVersion,
  LibraryOptions as SpartacusMiscOptions,
  readPackageJson,
  SPARTACUS_MISC,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  STOREFINDER_FEATURE_NAME,
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_TRANSLATIONS,
  STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { STOREFINDER_SCSS_FILE_NAME } from '../constants';

export function addMiscFeatures(options: SpartacusMiscOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addStorefinderFeature(appModulePath, options),
      addMiscPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addStorefinderFeature(
  appModulePath: string,
  options: SpartacusMiscOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
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
    styles: {
      scssFileName: STOREFINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_MISC,
    },
  });
}

function addMiscPackageJsonDependencies(packageJson: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;

    const spartacusMiscDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_MISC,
    };
    addPackageJsonDependency(tree, spartacusMiscDependency);
    context.logger.info(
      `✅️ Added '${spartacusMiscDependency.name}' into ${spartacusMiscDependency.type}`
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

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}
