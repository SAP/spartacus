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
  LibraryOptions as SpartacusStorefinderOptions,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
  PRODUCT_CONFIGURATOR_TRANSLATIONS,
  PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
  readPackageJson,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';

export function addProductConfiguratorFeatures(
  options: SpartacusStorefinderOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addProductConfiguratorFeature(appModulePath, options),
      addProductConfiguratorPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addProductConfiguratorFeature(
  appModulePath: string,
  options: SpartacusStorefinderOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME,
    featureModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    i18n: {
      resources: PRODUCT_CONFIGURATOR_TRANSLATIONS,
      chunks: PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
  });
}

function addProductConfiguratorPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
