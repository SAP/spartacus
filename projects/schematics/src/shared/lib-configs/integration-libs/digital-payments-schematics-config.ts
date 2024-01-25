/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CHECKOUT_BASE_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { CHECKOUT_BASE_MODULE } from '../checkout-schematics-config';

export const DIGITAL_PAYMENTS_FOLDER_NAME = 'digital-payments';
export const DIGITAL_PAYMENTS_MODULE_NAME = 'DigitalPayments';
export const DIGITAL_PAYMENTS_MODULE = 'DigitalPaymentsModule';
export const DIGITAL_PAYMENTS_TRANSLATIONS = 'dpTranslations';
export const DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG =
  'dpTranslationChunksConfig';

export const DIGITAL_PAYMENTS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: DIGITAL_PAYMENTS_FEATURE_NAME,
    mainScope: SPARTACUS_DIGITAL_PAYMENTS,
  },
  folderName: DIGITAL_PAYMENTS_FOLDER_NAME,
  moduleName: DIGITAL_PAYMENTS_MODULE_NAME,
  featureModule: {
    name: DIGITAL_PAYMENTS_MODULE,
    importPath: SPARTACUS_DIGITAL_PAYMENTS,
  },
  i18n: {
    resources: DIGITAL_PAYMENTS_TRANSLATIONS,
    chunks: DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
  },
  dependencyFeatures: [CHECKOUT_BASE_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: CHECKOUT_BASE_MODULE,
      featureModuleName: DIGITAL_PAYMENTS_MODULE,
    },
  ],
};
