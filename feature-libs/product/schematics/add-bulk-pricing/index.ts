import { Rule } from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  CLI_PRODUCT_FEATURE,
  LibraryOptions as SpartacusBulkPricingOptions,
  SPARTACUS_PRODUCT,
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
} from '../constants';

export function addBulkPricingFeature(
  options: SpartacusBulkPricingOptions
): Rule {
  return addLibraryFeature(options, {
    cliFeature: CLI_PRODUCT_FEATURE,
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
    dependencyManagement: {
      dependencies: peerDependencies,
    },
  });
}
