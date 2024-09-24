/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SUBSCRIPTION_BILLING_FEATURE_NAME,
  SPARTACUS_SUBSCRIPTION_BILLING,
  SPARTACUS_SUBSCRIPTION_BILLING_ROOT,
  SPARTACUS_SUBSCRIPTION_BILLING_ASSETS,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const SUBSCRIPTION_BILLING_FOLDER_NAME = 'subscription-billing';
export const SUBSCRIPTION_BILLING_MODULE = 'SubscriptionBillingModule';
export const SUBSCRIPTION_BILLING_MODULE_NAME = 'SubscriptionBilling';
export const SUBSCRIPTION_BILLING_ROOT_MODULE = 'SubscriptionBillingRootModule';
export const SUBSCRIPTION_BILLING_SCSS_FILE_NAME = 'subscription-billing.scss';
export const SUBSCRIPTION_BILLING_FEATURE_NAME_CONSTANT =
  'SUBSCRIPTION_BILLING_FEATURE';
export const SUBSCRIPTION_BILLING_TRANSLATIONS =
  'subscriptionBillingTranslations';
export const SUBSCRIPTION_BILLING_TRANSLATION_CHUNKS_CONFIG =
  'subscriptionBillingTranslationChunksConfig';

export const SUBSCRIPTION_BILLING_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: SUBSCRIPTION_BILLING_FEATURE_NAME,
    mainScope: SPARTACUS_SUBSCRIPTION_BILLING,
  },
  folderName: SUBSCRIPTION_BILLING_FOLDER_NAME,
  moduleName: SUBSCRIPTION_BILLING_MODULE_NAME,
  featureModule: [
    {
      name: SUBSCRIPTION_BILLING_MODULE,
      importPath: SPARTACUS_SUBSCRIPTION_BILLING,
    },
  ],
  rootModule: {
    importPath: SPARTACUS_SUBSCRIPTION_BILLING_ROOT,
    name: SUBSCRIPTION_BILLING_ROOT_MODULE,
  },
  styles: {
    scssFileName: SUBSCRIPTION_BILLING_SCSS_FILE_NAME,
    importStyle: SPARTACUS_SUBSCRIPTION_BILLING,
  },
  i18n: {
    resources: SUBSCRIPTION_BILLING_TRANSLATIONS,
    chunks: SUBSCRIPTION_BILLING_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_SUBSCRIPTION_BILLING_ASSETS,
  },
};
