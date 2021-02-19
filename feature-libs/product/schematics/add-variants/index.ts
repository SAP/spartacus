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
  readPackageJson,
  validateSpartacusInstallation,
  LibraryOptions as SpartacusVariantsOptions,
} from '@spartacus/schematics';

import {
  PRODUCT_SCSS_FILE_NAME,
  VARIANTS_FEATURE_NAME,
  VARIANTS_MODULE,
  VARIANTS_ROOT_MODULE,
  SPARTACUS_VARIANTS,
  SPARTACUS_VARIANTS_ROOT,
  SPARTACUS_VARIANTS_ASSETS,
  VARIANTS_TRANSLATION_CHUNKS_CONFIG,
  VARIANTS_TRANSLATIONS,
} from './../constants';

export function addVariantsFeatures(options: SpartacusVariantsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addVariantsFeature(appModulePath, options),
      addVariantsPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addVariantsFeature(
  appModulePath: string,
  options: SpartacusVariantsOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: VARIANTS_FEATURE_NAME,
    featureModule: {
      name: VARIANTS_MODULE,
      importPath: SPARTACUS_VARIANTS,
    },
    rootModule: {
      name: VARIANTS_ROOT_MODULE,
      importPath: SPARTACUS_VARIANTS_ROOT,
    },
    i18n: {
      resources: VARIANTS_TRANSLATIONS,
      chunks: VARIANTS_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_VARIANTS_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_VARIANTS,
    },
  });
}

function addVariantsPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_VARIANTS,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
