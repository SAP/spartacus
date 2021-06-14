import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  CLI_PRODUCT_VARIANTS_FEATURE,
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_PRODUCT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  BULK_PRICING_FEATURE_NAME_CONSTANT,
  BULK_PRICING_MODULE,
  BULK_PRICING_MODULE_NAME,
  BULK_PRICING_ROOT_MODULE,
  BULK_PRICING_TRANSLATIONS,
  BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
  PRODUCT_FOLDER_NAME,
  PRODUCT_SCSS_FILE_NAME,
  SPARTACUS_BULK_PRICING,
  SPARTACUS_BULK_PRICING_ASSETS,
  SPARTACUS_BULK_PRICING_ROOT,
  SPARTACUS_VARIANTS,
  SPARTACUS_VARIANTS_ASSETS,
  SPARTACUS_VARIANTS_ROOT,
  VARIANTS_FEATURE_NAME_CONSTANT,
  VARIANTS_MODULE,
  VARIANTS_MODULE_NAME,
  VARIANTS_ROOT_MODULE,
  VARIANTS_TRANSLATIONS,
  VARIANTS_TRANSLATION_CHUNKS_CONFIG,
} from '../constants';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_PRODUCT_BULK_PRICING_FEATURE, options.features)
        ? addBulkPricingFeature(options)
        : noop(),

      shouldAddFeature(CLI_PRODUCT_VARIANTS_FEATURE, options.features)
        ? addVariantsFeature(options)
        : noop(),
    ]);
  };
}

export function addBulkPricingFeature(options: SpartacusProductOptions): Rule {
  return addLibraryFeature(options, {
    folderName: PRODUCT_FOLDER_NAME,
    moduleName: BULK_PRICING_MODULE_NAME,
    featureModule: {
      name: BULK_PRICING_MODULE,
      importPath: SPARTACUS_BULK_PRICING,
    },
    rootModule: {
      name: BULK_PRICING_ROOT_MODULE,
      importPath: SPARTACUS_BULK_PRICING_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_BULK_PRICING_ROOT,
      namedImports: [BULK_PRICING_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: BULK_PRICING_TRANSLATIONS,
      chunks: BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_BULK_PRICING_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT,
    },
  });
}

export function addVariantsFeature(options: SpartacusProductOptions): Rule {
  return addLibraryFeature(options, {
    folderName: PRODUCT_FOLDER_NAME,
    moduleName: VARIANTS_MODULE_NAME,
    featureModule: {
      name: VARIANTS_MODULE,
      importPath: SPARTACUS_VARIANTS,
    },
    rootModule: {
      name: VARIANTS_ROOT_MODULE,
      importPath: SPARTACUS_VARIANTS_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_VARIANTS_ROOT,
      namedImports: [VARIANTS_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: VARIANTS_TRANSLATIONS,
      chunks: VARIANTS_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_VARIANTS_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT,
    },
  });
}
