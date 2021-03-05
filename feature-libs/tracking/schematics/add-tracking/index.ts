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
  LibraryOptions as SpartacusPersonalizationOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  PERSONALIZATION_FEATURE_NAME,
  PERSONALIZATION_MODULE,
  PERSONALIZATION_ROOT_MODULE,
  SPARTACUS_PERSONALIZATION,
  SPARTACUS_PERSONALIZATION_ROOT,
} from '../constants';

export function addPersonalizationFeatures(
  options: SpartacusPersonalizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addPersonalizationFeature(appModulePath, options),
      addPersonalizationPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addPersonalizationFeature(
  appModulePath: string,
  options: SpartacusPersonalizationOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: PERSONALIZATION_FEATURE_NAME,
    featureModule: {
      name: PERSONALIZATION_MODULE,
      importPath: SPARTACUS_PERSONALIZATION,
    },
    rootModule: {
      name: PERSONALIZATION_ROOT_MODULE,
      importPath: SPARTACUS_PERSONALIZATION_ROOT,
    },
  });
}

function addPersonalizationPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_PERSONALIZATION,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
