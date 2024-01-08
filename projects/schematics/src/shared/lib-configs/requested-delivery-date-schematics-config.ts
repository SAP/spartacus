/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  REQUESTED_DELIVERY_DATE_FEATURE_NAME,
  SPARTACUS_REQUESTED_DELIVERY_DATE,
  SPARTACUS_REQUESTED_DELIVERY_DATE_ASSETS,
  SPARTACUS_REQUESTED_DELIVERY_DATE_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const REQUESTED_DELIVERY_DATE_FEATURE_NAME_CONSTANT =
  'REQUESTED_DELIVERY_DATE_FEATURE';
export const REQUESTED_DELIVERY_DATE_FOLDER_NAME = 'requested-delivery-date';
export const REQUESTED_DELIVERY_DATE_TRANSLATIONS =
  'requestedDeliveryDateTranslations';
export const REQUESTED_DELIVERY_DATE_TRANSLATION_CHUNKS_CONFIG =
  'requestedDeliveryDateTranslationChunksConfig';
export const REQUESTED_DELIVERY_DATE_ROOT_MODULE =
  'RequestedDeliveryDateRootModule';
export const REQUESTED_DELIVERY_DATE_MODULE = 'RequestedDeliveryDateModule';

export const REQUESTED_DELIVERY_DATE_SCSS_FILE_NAME =
  'requested-delivery-date.scss';

export const REQUESTED_DELIVERY_DATE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: REQUESTED_DELIVERY_DATE_FEATURE_NAME,
    mainScope: SPARTACUS_REQUESTED_DELIVERY_DATE,
  },
  folderName: REQUESTED_DELIVERY_DATE_FOLDER_NAME,
  moduleName: REQUESTED_DELIVERY_DATE_MODULE,
  featureModule: {
    name: REQUESTED_DELIVERY_DATE_MODULE,
    importPath: SPARTACUS_REQUESTED_DELIVERY_DATE,
  },
  rootModule: {
    name: REQUESTED_DELIVERY_DATE_ROOT_MODULE,
    importPath: SPARTACUS_REQUESTED_DELIVERY_DATE_ROOT,
  },
  styles: {
    scssFileName: REQUESTED_DELIVERY_DATE_SCSS_FILE_NAME,
    importStyle: SPARTACUS_REQUESTED_DELIVERY_DATE,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_REQUESTED_DELIVERY_DATE_ROOT,
    namedImports: [REQUESTED_DELIVERY_DATE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: REQUESTED_DELIVERY_DATE_TRANSLATIONS,
    chunks: REQUESTED_DELIVERY_DATE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_REQUESTED_DELIVERY_DATE_ASSETS,
  },
  dependencyFeatures: [
    CART_BASE_FEATURE_NAME,
    CHECKOUT_BASE_FEATURE_NAME,
    ORDER_FEATURE_NAME,
  ],
};
