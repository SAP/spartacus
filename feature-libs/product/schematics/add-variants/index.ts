import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusVariantsOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  SPARTACUS_VARIANTS,
  SPARTACUS_VARIANTS_ASSETS,
  SPARTACUS_VARIANTS_ROOT,
  VARIANTS_FEATURE_NAME,
  VARIANTS_MODULE,
  VARIANTS_ROOT_MODULE,
  VARIANTS_TRANSLATIONS,
  VARIANTS_TRANSLATION_CHUNKS_CONFIG,
} from './../constants';

// TODO: Index file for product schematics
export function addVariantsFeatures(options: SpartacusVariantsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addVariantsFeature(options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addVariantsFeature(options: SpartacusVariantsOptions): Rule {
  return addLibraryFeature(options, {
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
