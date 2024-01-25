/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CHECKOUT_B2B_CMS_COMPONENTS } from '@spartacus/checkout/b2b/root';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { CheckoutScheduledReplenishmentEventModule } from './events/checkout-scheduled-replenishment-event.module';

export const CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS: string[] = [
  /**
   *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
   * Re-test the B2B checkout flow after doing it.
   */
  ...CHECKOUT_B2B_CMS_COMPONENTS,
  'CheckoutScheduleReplenishmentOrder',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutScheduledReplenishmentEventModule],
  providers: [provideDefaultConfigFactory(defaultCheckoutComponentsConfig)],
})
export class CheckoutScheduledReplenishmentRootModule {}
