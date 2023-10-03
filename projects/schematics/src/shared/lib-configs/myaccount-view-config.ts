import {
  MYACCOUNT_VIEW_FEATURE_NAME,
  SPARTACUS_MYACCOUNT_VIEW,
  SPARTACUS_MYACCOUNT_VIEW_ASSETS,
  SPARTACUS_MYACCOUNT_VIEW_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils';
import { CUSTOMER_TICKETING_MODULE } from './customer-ticketing-schematics-config';
import { ORDER_MODULE } from './order-schematics-config';
import { USER_ACCOUNT_MODULE } from './user-schematics-config';
export const MYACCOUNT_VIEW_FOLDER_NAME = 'myaccount-view';
export const MYACCOUNT_VIEW_MODULE_NAME = 'MyAccountView';
export const MYACCOUNT_VIEW_MODULE = 'MyAccountViewModule';
export const MYACCOUNT_VIEW_ROOT_MODULE = 'MyAccountViewRootModule';
export const MYACCOUNT_VIEW_FEATURE_NAME_CONSTANT = 'MYACCOUNT_VIEW_FEATURE';
export const MYACCOUNT_VIEW_TRANSLATIONS = 'myAccountViewTranslations';
export const MYACCOUNT_VIEW_TRANSLATION_CHUNKS_CONFIG =
  'myAccountViewTranslationChunksConfig';
export const MYACCOUNT_VIEW_SCSS_FILE_NAME = 'myaccount-view.scss';
export const MYACCOUNT_VIEW_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: MYACCOUNT_VIEW_FEATURE_NAME,
    mainScope: SPARTACUS_MYACCOUNT_VIEW,
  },
  folderName: MYACCOUNT_VIEW_FOLDER_NAME,
  moduleName: MYACCOUNT_VIEW_MODULE_NAME,
  featureModule: {
    name: MYACCOUNT_VIEW_MODULE,
    importPath: SPARTACUS_MYACCOUNT_VIEW,
  },
  rootModule: {
    name: MYACCOUNT_VIEW_ROOT_MODULE,
    importPath: SPARTACUS_MYACCOUNT_VIEW_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_MYACCOUNT_VIEW_ROOT,
    namedImports: [MYACCOUNT_VIEW_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: MYACCOUNT_VIEW_TRANSLATIONS,
    chunks: MYACCOUNT_VIEW_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_MYACCOUNT_VIEW_ASSETS,
  },
  styles: {
    scssFileName: MYACCOUNT_VIEW_SCSS_FILE_NAME,
    importStyle: SPARTACUS_MYACCOUNT_VIEW,
  },
  dependencyFeatures: [
    USER_ACCOUNT_MODULE,
    CUSTOMER_TICKETING_MODULE,
    ORDER_MODULE,
  ],
  //   importAfter: [
  //     {
  //       markerModuleName: ,
  //       featureModuleName: ,
  //     },]
};
