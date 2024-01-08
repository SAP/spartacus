/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  PICKUP_IN_STORE_FEATURE_NAME,
  SPARTACUS_PICKUP_IN_STORE,
  SPARTACUS_PICKUP_IN_STORE_ASSETS,
  SPARTACUS_PICKUP_IN_STORE_ROOT,
  STOREFINDER_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const PICKUP_IN_STORE_FOLDER_NAME = 'pickup-in-store';
export const PICKUP_IN_STORE_MODULE_NAME = 'PickupInStore';

export const PICKUP_IN_STORE_FEATURE_NAME_CONSTANT = 'PICKUP_IN_STORE_FEATURE';
export const PICKUP_IN_STORE_MODULE = 'PickupInStoreModule';
export const PICKUP_IN_STORE_ROOT_MODULE = 'PickupInStoreRootModule';
export const PICKUP_IN_STORE_TRANSLATIONS = 'pickupInStoreTranslations';
export const PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG =
  'pickupInStoreTranslationChunksConfig';
export const PICKUP_IN_STORE_SCSS_FILE_NAME = 'pickup-in-store.scss';

export const PICKUP_IN_STORE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PICKUP_IN_STORE_FEATURE_NAME,
    mainScope: SPARTACUS_PICKUP_IN_STORE,
  },
  folderName: PICKUP_IN_STORE_FOLDER_NAME,
  moduleName: PICKUP_IN_STORE_MODULE_NAME,
  featureModule: {
    name: PICKUP_IN_STORE_MODULE,
    importPath: SPARTACUS_PICKUP_IN_STORE,
  },
  rootModule: {
    name: PICKUP_IN_STORE_ROOT_MODULE,
    importPath: SPARTACUS_PICKUP_IN_STORE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_PICKUP_IN_STORE_ROOT,
    namedImports: [PICKUP_IN_STORE_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: PICKUP_IN_STORE_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PICKUP_IN_STORE,
  },
  i18n: {
    resources: PICKUP_IN_STORE_TRANSLATIONS,
    chunks: PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_PICKUP_IN_STORE_ASSETS,
  },
  dependencyFeatures: [
    CART_BASE_FEATURE_NAME,
    ORDER_FEATURE_NAME,
    STOREFINDER_FEATURE_NAME,
    USER_PROFILE_FEATURE_NAME,
  ],
};
