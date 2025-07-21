/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  SUBSCRIPTION_BILLING_CORE_FEATURE,
  SUBSCRIPTION_BILLING_FEATURE,
} from './feature-name';
import { defaultSubscriptionBillingRoutingConfig } from './config/default-subscription-billing-routing-config';
import { SubscriptionBillingEventModule } from './events';

export function defaultSubscriptionBillingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [SUBSCRIPTION_BILLING_FEATURE]: {
        cmsComponents: [
          'SubscriptionHistoryComponent',
          'SubscriptionProductPriceComponent',
          'SubscriptionDetailsComponent',
        ],
      },
      [SUBSCRIPTION_BILLING_CORE_FEATURE]: SUBSCRIPTION_BILLING_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [SubscriptionBillingEventModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MockResponseInterceptor,
    //   multi: true,
    // },
    provideDefaultConfigFactory(defaultSubscriptionBillingComponentsConfig),
    provideDefaultConfig(defaultSubscriptionBillingRoutingConfig),
  ],
})
export class SubscriptionBillingRootModule {}
