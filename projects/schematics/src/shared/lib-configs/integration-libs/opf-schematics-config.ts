/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OPF_BASE_FEATURE_NAME,
  OPF_CHECKOUT_FEATURE_NAME,
  OPF_CTA_FEATURE_NAME,
  OPF_GLOBAL_FUNCTIONS_FEATURE_NAME,
  OPF_PAYMENT_FEATURE_NAME,
  OPF_QUICK_BUY_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_BOOTSTRAP_FUNCTIONS,
  SPARTACUS_BOOTSTRAP_MIXINS,
  SPARTACUS_BOOTSTRAP_VARIABLES,
  SPARTACUS_OPF,
  SPARTACUS_OPF_BASE,
  SPARTACUS_OPF_BASE_ROOT,
  SPARTACUS_OPF_CHECKOUT,
  SPARTACUS_OPF_CHECKOUT_ASSETS,
  SPARTACUS_OPF_CHECKOUT_ROOT,
  SPARTACUS_OPF_CTA,
  SPARTACUS_OPF_CTA_ROOT,
  SPARTACUS_OPF_GLOBAL_FUNCTIONS,
  SPARTACUS_OPF_GLOBAL_FUNCTIONS_ROOT,
  SPARTACUS_OPF_ORDER,
  SPARTACUS_OPF_PAYMENT,
  SPARTACUS_OPF_PAYMENT_ASSETS,
  SPARTACUS_OPF_PAYMENT_ROOT,
  SPARTACUS_OPF_QUICK_BUY,
  SPARTACUS_OPF_QUICK_BUY_ROOT,
} from '../../libs-constants';
import { AdditionalFeatureConfiguration } from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';
import { ORDER_MODULE } from '../order-schematics-config';

export interface SpartacusOpfOptions extends LibraryOptions {
  opfBaseUrl?: string;
  commerceCloudPublicKey?: string;
}

export const OPF_FOLDER_NAME = 'opf';
export const OPF_MODULE_NAME = 'Opf';
export const OPF_SCSS_FILE_NAME = 'opf.scss';
export const OPF_CONFIG = 'OpfConfig';
export const OPF_QUICKBUY_CONFIG = 'OpfQuickBuyConfig';

export const OPF_CHECKOUT_FEATURE_NAME_CONSTANT = 'OPF_CHECKOUT_FEATURE';
export const OPF_CHECKOUT_MODULE = 'OpfCheckoutModule';
export const OPF_CHECKOUT_ROOT_MODULE = 'OpfCheckoutRootModule';
export const OPF_CHECKOUT_TRANSLATIONS = 'opfCheckoutTranslations';
export const OPF_CHECKOUT_TRANSLATION_CHUNKS_CONFIG =
  'opfCheckoutTranslationChunksConfig';

export const OPF_BASE_FEATURE_NAME_CONSTANT = 'OPF_BASE_FEATURE';
export const OPF_BASE_MODULE = 'OpfBaseModule';
export const OPF_BASE_ROOT_MODULE = 'OpfBaseRootModule';

export const OPF_GLOBAL_FUNCTIONS_FEATURE_NAME_CONSTANT =
  'OPF_GLOBAL_FUNCTIONS_FEATURE';
export const OPF_GLOBAL_FUNCTIONS_MODULE = 'OpfGlobalFunctionsModule';
export const OPF_GLOBAL_FUNCTIONS_ROOT_MODULE = 'OpfGlobalFunctionsRootModule';

export const OPF_CTA_FEATURE_NAME_CONSTANT = 'OPF_CTA_FEATURE';
export const OPF_CTA_MODULE = 'OpfCtaModule';
export const OPF_CTA_ROOT_MODULE = 'OpfCtaRootModule';

export const OPF_QUICK_BUY_FEATURE_NAME_CONSTANT = 'OPF_QUICK_BUY_FEATURE';
export const OPF_QUICK_BUY_MODULE = 'OpfQuickBuyModule';
export const OPF_QUICK_BUY_ROOT_MODULE = 'OpfQuickBuyRootModule';

export const OPF_PAYMENT_FEATURE_NAME_CONSTANT = 'OPF_PAYMENT_FEATURE';
export const OPF_PAYMENT_MODULE = 'OpfPaymentModule';
export const OPF_PAYMENT_ROOT_MODULE = 'OpfPaymentRootModule';
export const OPF_PAYMENT_TRANSLATIONS = 'opfPaymentTranslations';
export const OPF_PAYMENT_TRANSLATION_CHUNKS_CONFIG =
  'opfPaymentTranslationChunksConfig';
export const OPF_ORDER_MODULE = 'OpfOrderModule';

export const OPF_BASE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_BASE_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_BASE,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_BASE_MODULE,
    importPath: SPARTACUS_OPF_BASE,
  },
  rootModule: {
    name: OPF_BASE_ROOT_MODULE,
    importPath: SPARTACUS_OPF_BASE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_BASE_ROOT,
    namedImports: [OPF_BASE_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
  customConfig: buildOpfConfig,
};

export const OPF_PAYMENT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_PAYMENT_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_PAYMENT,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_PAYMENT_MODULE,
    importPath: SPARTACUS_OPF_PAYMENT,
  },
  rootModule: {
    name: OPF_PAYMENT_ROOT_MODULE,
    importPath: SPARTACUS_OPF_PAYMENT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_PAYMENT_ROOT,
    namedImports: [OPF_PAYMENT_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: OPF_PAYMENT_TRANSLATIONS,
    chunks: OPF_PAYMENT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_OPF_PAYMENT_ASSETS,
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
  customConfig: buildOpfConfig,
};

export const OPF_CHECKOUT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_CHECKOUT_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_CHECKOUT,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: [
    {
      name: OPF_CHECKOUT_MODULE,
      importPath: SPARTACUS_OPF_CHECKOUT,
    },
    {
      name: OPF_ORDER_MODULE,
      importPath: SPARTACUS_OPF_ORDER,
    },
  ],
  rootModule: {
    name: OPF_CHECKOUT_ROOT_MODULE,
    importPath: SPARTACUS_OPF_CHECKOUT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_CHECKOUT_ROOT,
    namedImports: [OPF_CHECKOUT_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: OPF_CHECKOUT_TRANSLATIONS,
    chunks: OPF_CHECKOUT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_OPF_CHECKOUT_ASSETS,
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
  customConfig: buildOpfConfig,
  dependencyFeatures: [
    OPF_PAYMENT_FEATURE_NAME,
    OPF_BASE_FEATURE_NAME,
    OPF_CTA_FEATURE_NAME,
    OPF_GLOBAL_FUNCTIONS_FEATURE_NAME,
    OPF_QUICK_BUY_FEATURE_NAME,
    ORDER_FEATURE_NAME,
  ],
  importAfter: [
    {
      markerModuleName: ORDER_MODULE,
      featureModuleName: OPF_ORDER_MODULE,
    },
  ],
};

export const OPF_CTA_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_CTA_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_CTA,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_CTA_MODULE,
    importPath: SPARTACUS_OPF_CTA,
  },
  rootModule: {
    name: OPF_CTA_ROOT_MODULE,
    importPath: SPARTACUS_OPF_CTA_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_CTA_ROOT,
    namedImports: [OPF_CTA_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
};

export const OPF_GLOBAL_FUNCTIONS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_GLOBAL_FUNCTIONS_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_GLOBAL_FUNCTIONS,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_GLOBAL_FUNCTIONS_MODULE,
    importPath: SPARTACUS_OPF_GLOBAL_FUNCTIONS,
  },
  rootModule: {
    name: OPF_GLOBAL_FUNCTIONS_ROOT_MODULE,
    importPath: SPARTACUS_OPF_GLOBAL_FUNCTIONS_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_GLOBAL_FUNCTIONS_ROOT,
    namedImports: [OPF_GLOBAL_FUNCTIONS_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
};

export const OPF_QUICK_BUY_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_QUICK_BUY_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_QUICK_BUY,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_QUICK_BUY_MODULE,
    importPath: SPARTACUS_OPF_QUICK_BUY,
  },
  rootModule: {
    name: OPF_QUICK_BUY_ROOT_MODULE,
    importPath: SPARTACUS_OPF_QUICK_BUY_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_QUICK_BUY_ROOT,
    namedImports: [OPF_QUICK_BUY_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
};

function buildOpfConfig(
  options: SpartacusOpfOptions
): AdditionalFeatureConfiguration<SpartacusOpfOptions> {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_OPF_BASE_ROOT,
          namedImports: [OPF_CONFIG],
        },
      ],
      content: `<${OPF_CONFIG}>{
          opf: {
            opfBaseUrl: "${options.opfBaseUrl || 'PLACEHOLDER_OPF_BASE_URL'}",
            commerceCloudPublicKey: "${
              options.commerceCloudPublicKey ||
              'PLACEHOLDER_COMMERCE_CLOUD_PUBLIC_KEY'
            }",
          },
        }`,
    },
  };
}
