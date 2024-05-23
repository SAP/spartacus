/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  ESTIMATED_DELIVERY_DATE_FEATURE_NAME,
  SPARTACUS_ESTIMATED_DELIVERY_DATE,
  SPARTACUS_ESTIMATED_DELIVERY_DATE_ASSETS,
  SPARTACUS_ESTIMATED_DELIVERY_DATE_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';
import { CART_BASE_MODULE } from './cart-schematics-config';

export const ESTIMATED_DELIVERY_DATE_FEATURE_NAME_CONSTANT =
  'ESTIMATED_DELIVERY_DATE_FEATURE';
export const ESTIMATED_DELIVERY_DATE_FOLDER_NAME = 'estimated-delivery-date';
export const ESTIMATED_DELIVERY_DATE_TRANSLATIONS =
  'estimatedDeliveryDateTranslations';
export const ESTIMATED_DELIVERY_DATE_TRANSLATION_CHUNKS_CONFIG =
  'estimatedDeliveryDateTranslationChunksConfig';
export const ESTIMATED_DELIVERY_DATE_ROOT_MODULE =
  'EstimatedDeliveryDateRootModule';
export const ESTIMATED_DELIVERY_DATE_MODULE = 'EstimatedDeliveryDateModule';

export const ESTIMATED_DELIVERY_DATE_SCSS_FILE_NAME =
  'estimated-delivery-date.scss';

export const ESTIMATED_DELIVERY_DATE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: ESTIMATED_DELIVERY_DATE_FEATURE_NAME,
    mainScope: SPARTACUS_ESTIMATED_DELIVERY_DATE,
  },
  folderName: ESTIMATED_DELIVERY_DATE_FOLDER_NAME,
  moduleName: ESTIMATED_DELIVERY_DATE_MODULE,
  featureModule: {
    name: ESTIMATED_DELIVERY_DATE_MODULE,
    importPath: SPARTACUS_ESTIMATED_DELIVERY_DATE,
  },
  rootModule: {
    name: ESTIMATED_DELIVERY_DATE_ROOT_MODULE,
    importPath: SPARTACUS_ESTIMATED_DELIVERY_DATE_ROOT,
  },
  styles: {
    scssFileName: ESTIMATED_DELIVERY_DATE_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ESTIMATED_DELIVERY_DATE,
  },
  i18n: {
    resources: ESTIMATED_DELIVERY_DATE_TRANSLATIONS,
    chunks: ESTIMATED_DELIVERY_DATE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_ESTIMATED_DELIVERY_DATE_ASSETS,
  },
  dependencyFeatures: [
    CART_BASE_FEATURE_NAME,
    CHECKOUT_BASE_FEATURE_NAME,
    ORDER_FEATURE_NAME,
  ],
  importAfter: [
    {
      markerModuleName: CART_BASE_MODULE,
      featureModuleName: ESTIMATED_DELIVERY_DATE_MODULE,
    },
  ],
};
