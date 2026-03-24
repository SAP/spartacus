/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  subscriptionBillingTranslationsEn,
  subscriptionBillingTranslationChunksConfig,
} from '@spartacus/subscription-billing/assets';
import {
  SUBSCRIPTION_BILLING_FEATURE,
  SubscriptionBillingRootModule,
} from '@spartacus/subscription-billing/root';
@NgModule({
  imports: [SubscriptionBillingRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [SUBSCRIPTION_BILLING_FEATURE]: {
          module: () =>
            import('@spartacus/subscription-billing').then(
              (m) => m.SubscriptionBillingModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: subscriptionBillingTranslationsEn },
        chunks: subscriptionBillingTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class SubscriptionBillingFeatureModule {}
