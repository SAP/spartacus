/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CUSTOMER_TICKETING_FEATURE_NAME,
  SPARTACUS_CUSTOMER_TICKETING,
  SPARTACUS_CUSTOMER_TICKETING_ASSETS,
  SPARTACUS_CUSTOMER_TICKETING_ROOT,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const CUSTOMER_TICKETING_FOLDER_NAME = 'customer-ticketing';
export const CUSTOMER_TICKETING_MODULE_NAME = 'CustomerTicketing';
export const CUSTOMER_TICKETING_SCSS_FILE_NAME = 'customer-ticketing.scss';

export const CUSTOMER_TICKETING_MODULE = 'CustomerTicketingModule';
export const CUSTOMER_TICKETING_ROOT_MODULE = 'CustomerTicketingRootModule';
export const CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT =
  'CUSTOMER_TICKETING_FEATURE';
export const CUSTOMER_TICKETING_TRANSLATIONS = 'customerTicketingTranslations';
export const CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG =
  'customerTicketingTranslationChunksConfig';

export const CUSTOMER_TICKETING_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CUSTOMER_TICKETING_FEATURE_NAME,
    mainScope: SPARTACUS_CUSTOMER_TICKETING,
  },
  folderName: CUSTOMER_TICKETING_FOLDER_NAME,
  moduleName: CUSTOMER_TICKETING_MODULE_NAME,
  featureModule: {
    name: CUSTOMER_TICKETING_MODULE,
    importPath: SPARTACUS_CUSTOMER_TICKETING,
  },
  rootModule: {
    name: CUSTOMER_TICKETING_ROOT_MODULE,
    importPath: SPARTACUS_CUSTOMER_TICKETING_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CUSTOMER_TICKETING_ROOT,
    namedImports: [CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CUSTOMER_TICKETING_TRANSLATIONS,
    chunks: CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CUSTOMER_TICKETING_ASSETS,
  },
  styles: {
    scssFileName: CUSTOMER_TICKETING_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CUSTOMER_TICKETING,
  },
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};
