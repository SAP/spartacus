import {
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_BASE_ROOT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
} from '../../libs-constants';
import { FeatureConfig } from '../../utils/lib-utils';
import { CHECKOUT_BASE_FEATURE_NAME_CONSTANT } from '../checkout-schematics-config';

export const DIGITAL_PAYMENTS_FOLDER_NAME = 'digital-payments';
export const DIGITAL_PAYMENTS_MODULE_NAME = 'DigitalPayments';
export const DIGITAL_PAYMENTS_MODULE = 'DigitalPaymentsModule';
export const DIGITAL_PAYMENTS_TRANSLATIONS = 'dpTranslations';
export const DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG =
  'dpTranslationChunksConfig';

export const DIGITAL_PAYMENTS_SCHEMATICS_CONFIG: FeatureConfig = {
  folderName: DIGITAL_PAYMENTS_FOLDER_NAME,
  moduleName: DIGITAL_PAYMENTS_MODULE_NAME,
  featureModule: {
    name: DIGITAL_PAYMENTS_MODULE,
    importPath: SPARTACUS_DIGITAL_PAYMENTS,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: DIGITAL_PAYMENTS_TRANSLATIONS,
    chunks: DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
  },
  dependencyManagement: {
    featureName: CLI_DIGITAL_PAYMENTS_FEATURE,
    featureDependencies: {
      [SPARTACUS_CHECKOUT]: [CLI_CHECKOUT_BASE_FEATURE],
    },
  },
};
