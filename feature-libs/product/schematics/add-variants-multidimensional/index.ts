import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  getAppModule,
  installPackageJsonDependencies,
  readPackageJson,
  validateSpartacusInstallation,
  LibraryOptions as SpartacusVariantsMultiDimensionalOptions,
} from '@spartacus/schematics';

import {
  VARIANTS_MULTIDIMENSIONAL_FEATURE_NAME,
  VARIANTS_MULTIDIMENSIONAL_MODULE,
  VARIANTS_MULTIDIMENSIONAL_ROOT_MODULE,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ROOT,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ASSETS,
  VARIANTS_MULTIDIMENSIONAL_TRANSLATION_CHUNKS_CONFIG,
  VARIANTS_MULTIDIMENSIONAL_TRANSLATIONS,
} from './../constants';

export function addVariantsMultiDimensionalFeatures(
  options: SpartacusVariantsMultiDimensionalOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);
    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addVariantsMultiDimensionalFeature(appModulePath, options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addVariantsMultiDimensionalFeature(
  appModulePath: string,
  options: SpartacusVariantsMultiDimensionalOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: VARIANTS_MULTIDIMENSIONAL_FEATURE_NAME,
    featureModule: {
      name: VARIANTS_MULTIDIMENSIONAL_MODULE,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL,
    },
    rootModule: {
      name: VARIANTS_MULTIDIMENSIONAL_ROOT_MODULE,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ROOT,
    },
    i18n: {
      resources: VARIANTS_MULTIDIMENSIONAL_TRANSLATIONS,
      chunks: VARIANTS_MULTIDIMENSIONAL_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ASSETS,
    },
  });
}
