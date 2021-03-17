import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  getAppModule,
  getSpartacusSchematicsVersion,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusSmartEditOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  SMARTEDIT_FEATURE_NAME,
  SMARTEDIT_MODULE,
  SMARTEDIT_ROOT_MODULE,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_SMARTEDIT_ASSETS,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../constants';

export function addSmartEditFeatures(options: SpartacusSmartEditOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addSmartEditFeature(appModulePath, options),
      addSmartEditPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addSmartEditFeature(
  appModulePath: string,
  options: SpartacusSmartEditOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: SMARTEDIT_FEATURE_NAME,
    featureModule: {
      name: SMARTEDIT_MODULE,
      importPath: SPARTACUS_SMARTEDIT,
    },
    rootModule: {
      name: SMARTEDIT_ROOT_MODULE,
      importPath: SPARTACUS_SMARTEDIT_ROOT,
    },
    assets: {
      input: SPARTACUS_SMARTEDIT_ASSETS,
      glob: '**/*',
    },
  });
}

function addSmartEditPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SMARTEDIT,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
