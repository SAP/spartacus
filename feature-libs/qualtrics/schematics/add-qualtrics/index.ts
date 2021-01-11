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
  LibraryOptions as SpartacusQualtricsOptions,
  QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
  QUALTRICS_FEATURE_NAME,
  QUALTRICS_MODULE,
  QUALTRICS_ROOT_MODULE,
  readPackageJson,
  SPARTACUS_QUALTRICS,
  SPARTACUS_QUALTRICS_ROOT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';

export function addQualtricsFeatures(options: SpartacusQualtricsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addQualtricsFeature(appModulePath, options),
      addQualtricsPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addQualtricsFeature(
  appModulePath: string,
  options: SpartacusQualtricsOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: QUALTRICS_FEATURE_NAME,
    featureModule: {
      name: QUALTRICS_MODULE,
      importPath: SPARTACUS_QUALTRICS,
    },
    rootModule: {
      name: QUALTRICS_ROOT_MODULE,
      importPath: SPARTACUS_QUALTRICS_ROOT,
    },
    styles: {
      scssFileName: QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
      importStyle: SPARTACUS_QUALTRICS,
    },
  });
}

function addQualtricsPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_QUALTRICS,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
