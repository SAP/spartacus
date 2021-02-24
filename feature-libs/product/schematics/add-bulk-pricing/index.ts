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
  LibraryOptions as SpartacusBulkPricingOptions,
} from '@spartacus/schematics';

import {
  PRODUCT_SCSS_FILE_NAME,
  BULK_PRICING_FEATURE_NAME,
  BULK_PRICING_MODULE,
  BULK_PRICING_ROOT_MODULE,
  SPARTACUS_BULK_PRICING,
  SPARTACUS_BULK_PRICING_ROOT,
  SPARTACUS_BULK_PRICING_ASSETS,
  BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
  BULK_PRICING_TRANSLATIONS,
} from '../constants';

export function addBulkPricingFeatures(
  options: SpartacusBulkPricingOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);
    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addBulkPricingFeature(appModulePath, options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addBulkPricingFeature(
  appModulePath: string,
  options: SpartacusBulkPricingOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
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
    styles: {
      scssFileName: PRODUCT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_BULK_PRICING,
    },
  });
}
