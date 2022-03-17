import {
  CLI_CART_BASE_FEATURE,
  CLI_ORDER_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  SPARTACUS_CART,
  SPARTACUS_ORDER,
  SPARTACUS_ORDER_ASSETS,
  SPARTACUS_ORDER_ROOT,
  SPARTACUS_USER,
} from '../libs-constants';
import { FeatureConfig } from '../utils/lib-utils';

export const ORDER_FOLDER_NAME = 'order';
export const ORDER_MODULE_NAME = 'Order';
export const ORDER_SCSS_FILE_NAME = 'order.scss';

export const ORDER_MODULE = 'OrderModule';
export const ORDER_ROOT_MODULE = 'OrderRootModule';
export const ORDER_FEATURE_NAME_CONSTANT = 'ORDER_FEATURE';
export const ORDER_TRANSLATIONS = 'orderTranslations';
export const ORDER_TRANSLATION_CHUNKS_CONFIG = 'orderTranslationChunksConfig';

export const ORDER_SCHEMATICS_CONFIG: FeatureConfig = {
  library: SPARTACUS_ORDER,
  folderName: ORDER_FOLDER_NAME,
  moduleName: ORDER_MODULE_NAME,
  featureModule: {
    name: ORDER_MODULE,
    importPath: SPARTACUS_ORDER,
  },
  rootModule: {
    name: ORDER_ROOT_MODULE,
    importPath: SPARTACUS_ORDER_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_ORDER_ROOT,
    namedImports: [ORDER_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: ORDER_TRANSLATIONS,
    chunks: ORDER_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_ORDER_ASSETS,
  },
  styles: {
    scssFileName: ORDER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ORDER,
  },
  dependencyManagement: {
    featureName: CLI_ORDER_FEATURE,
    featureDependencies: {
      [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
      [SPARTACUS_USER]: [CLI_USER_ACCOUNT_FEATURE],
    },
  },
};
