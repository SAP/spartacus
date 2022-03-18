import {
  CLI_CART_BASE_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_ORDER_FEATURE,
  SPARTACUS_CART,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_B2B,
  SPARTACUS_CHECKOUT_B2B_ASSETS,
  SPARTACUS_CHECKOUT_B2B_ROOT,
  SPARTACUS_CHECKOUT_BASE,
  SPARTACUS_CHECKOUT_BASE_ASSETS,
  SPARTACUS_CHECKOUT_BASE_ROOT,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT,
  SPARTACUS_ORDER,
} from '../libs-constants';
import { FeatureConfig } from '../utils/lib-utils';

export const CHECKOUT_FOLDER_NAME = 'checkout';
export const CHECKOUT_SCSS_FILE_NAME = 'checkout.scss';

export const CHECKOUT_BASE_FEATURE_NAME_CONSTANT = 'CHECKOUT_FEATURE';
export const CHECKOUT_BASE_MODULE_NAME = 'Checkout';
export const CHECKOUT_BASE_MODULE = 'CheckoutModule';
export const CHECKOUT_BASE_ROOT_MODULE = 'CheckoutRootModule';
export const CHECKOUT_BASE_TRANSLATIONS = 'checkoutTranslations';
export const CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG =
  'checkoutTranslationChunksConfig';

export const CHECKOUT_BASE_SCHEMATICS_CONFIG: FeatureConfig = {
  library: {
    cli: CLI_CHECKOUT_BASE_FEATURE,
    mainScope: SPARTACUS_CHECKOUT,
    featureScope: SPARTACUS_CHECKOUT_BASE,
  },
  folderName: CHECKOUT_FOLDER_NAME,
  moduleName: CHECKOUT_BASE_MODULE_NAME,
  featureModule: {
    name: CHECKOUT_BASE_MODULE,
    importPath: SPARTACUS_CHECKOUT_BASE,
  },
  rootModule: {
    name: CHECKOUT_BASE_ROOT_MODULE,
    importPath: SPARTACUS_CHECKOUT_BASE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CHECKOUT_BASE_TRANSLATIONS,
    chunks: CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CHECKOUT_BASE_ASSETS,
  },
  styles: {
    scssFileName: CHECKOUT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CHECKOUT,
  },
  dependencyManagement: {
    [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
    [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
  },
  recreate: true,
};

export const CHECKOUT_B2B_MODULE = 'CheckoutB2BModule';
export const CHECKOUT_B2B_ROOT_MODULE = 'CheckoutB2BRootModule';
export const CHECKOUT_B2B_TRANSLATIONS = 'checkoutB2BTranslations';
export const CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG =
  'checkoutB2BTranslationChunksConfig';

export const CHECKOUT_B2B_SCHEMATICS_CONFIG: FeatureConfig = {
  library: {
    cli: CLI_CHECKOUT_B2B_FEATURE,
    mainScope: SPARTACUS_CHECKOUT,
    featureScope: SPARTACUS_CHECKOUT_B2B,
  },
  folderName: CHECKOUT_FOLDER_NAME,
  moduleName: CHECKOUT_BASE_MODULE_NAME,
  featureModule: {
    name: CHECKOUT_B2B_MODULE,
    importPath: SPARTACUS_CHECKOUT_B2B,
  },
  rootModule: {
    name: CHECKOUT_B2B_ROOT_MODULE,
    importPath: SPARTACUS_CHECKOUT_B2B_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CHECKOUT_B2B_TRANSLATIONS,
    chunks: CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CHECKOUT_B2B_ASSETS,
  },
  styles: {
    scssFileName: CHECKOUT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CHECKOUT,
  },
  dependencyManagement: {
    [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
    [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
    [SPARTACUS_CHECKOUT]: [CLI_CHECKOUT_BASE_FEATURE],
  },
  recreate: true,
};

export const CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE =
  'CheckoutScheduledReplenishmentModule';
export const CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE =
  'CheckoutScheduledReplenishmentRootModule';
export const CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS =
  'checkoutScheduledReplenishmentTranslations';
export const CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG =
  'checkoutScheduledReplenishmentTranslationChunksConfig';

export const CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG: FeatureConfig =
  {
    library: {
      cli: CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      mainScope: SPARTACUS_CHECKOUT,
      featureScope: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
    },
    folderName: CHECKOUT_FOLDER_NAME,
    moduleName: CHECKOUT_BASE_MODULE_NAME,
    featureModule: {
      name: CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
      importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
    },
    rootModule: {
      name: CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
      importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
      namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS,
      chunks: CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS,
    },
    styles: {
      scssFileName: CHECKOUT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_CHECKOUT,
    },
    dependencyManagement: {
      [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
      [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
      [SPARTACUS_CHECKOUT]: [CLI_CHECKOUT_B2B_FEATURE],
    },
    recreate: true,
  };
