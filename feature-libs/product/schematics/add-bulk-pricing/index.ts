import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusBulkPricingOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  BULK_PRICING_FEATURE_NAME,
  BULK_PRICING_MODULE,
  BULK_PRICING_ROOT_MODULE,
  BULK_PRICING_TRANSLATIONS,
  BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_BULK_PRICING,
  SPARTACUS_BULK_PRICING_ASSETS,
  SPARTACUS_BULK_PRICING_ROOT,
} from '../constants';

export function addBulkPricingFeatures(
  options: SpartacusBulkPricingOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addBulkPricingFeature(options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addBulkPricingFeature(options: SpartacusBulkPricingOptions): Rule {
  return addLibraryFeature(options, {
    name: BULK_PRICING_FEATURE_NAME,
    featureModule: {
      name: BULK_PRICING_MODULE,
      importPath: SPARTACUS_BULK_PRICING,
    },
    rootModule: {
      name: BULK_PRICING_ROOT_MODULE,
      importPath: SPARTACUS_BULK_PRICING_ROOT,
    },
    i18n: {
      resources: BULK_PRICING_TRANSLATIONS,
      chunks: BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_BULK_PRICING_ASSETS,
    },
  });
}
