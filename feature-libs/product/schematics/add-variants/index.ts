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
  LibraryOptions as SpartacusVariantsOptions,
} from '@spartacus/schematics';

import {
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
  });
}
