/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig } from '@spartacus/core';

export { en as subscriptionBillingTranslationsEn } from './en/index';

export const subscriptionBillingTranslationChunksConfig: TranslationChunksConfig =
  {
    subscriptionBilling: [
      'subscriptionProduct',
      'subscriptionList',
      'subscriptionDetails',
      'subscriptionActions',
      'subscriptionCartItemList',
    ],
  };
