import {
  chain,
  noop,
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
  CLI_STOREFINDER_FEATURE,
  getAppModule,
  getSpartacusSchematicsVersion,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusStorefinderOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  STOREFINDER_FEATURE_NAME,
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_TRANSLATIONS,
  STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
  STORE_FINDER_SCSS_FILE_NAME,
  validateSpartacusInstallation,
} from '@spartacus/schematics';

export function addStorefinderFeatures(
  options: SpartacusStorefinderOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      shouldAddFeature(options.features, CLI_STOREFINDER_FEATURE)
        ? addStorefinderFeature(appModulePath, options)
        : noop(),
      addStorefinderPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addStorefinderFeature(
  appModulePath: string,
  options: SpartacusStorefinderOptions
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
      scssFileName: STORE_FINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_STOREFINDER,
    },
  });
}

function addStorefinderPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STOREFINDER,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
