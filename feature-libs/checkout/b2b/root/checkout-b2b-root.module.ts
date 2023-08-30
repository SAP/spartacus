/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CHECKOUT_BASE_CMS_COMPONENTS,
  CHECKOUT_FEATURE,
  CheckoutConfig,
} from '@spartacus/checkout/base/root';
import {
  CONFIG_INITIALIZER,
  CmsConfig,
  ConfigInitializer,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { of } from 'rxjs';
import { defaultB2BCheckoutConfig } from './config/default-b2b-checkout-config';
import { defaultCheckoutB2BRoutingConfig } from './config/default-checkout-b2b-routing-config';
import { CheckoutB2BEventModule } from './events/checkout-b2b-event.module';

export const CHECKOUT_B2B_CMS_COMPONENTS: string[] = [
  /**
   *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
   * Re-test the B2B checkout flow after doing it.
   */
  ...CHECKOUT_BASE_CMS_COMPONENTS,
  'CheckoutCostCenterComponent',
  'CheckoutPaymentType',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: CHECKOUT_B2B_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutB2BEventModule],
  providers: [
    provideDefaultConfig(defaultB2BCheckoutConfig),
    provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
    {
      provide: CONFIG_INITIALIZER,
      useFactory: (): ConfigInitializer => {
        return {
          scopes: ['checkout.flows.b2b-mockup'],
          configFactory: async (): Promise<CheckoutConfig> => {
            return of({}).toPromise();
          },
        };
      },

      multi: true,
    },
  ],
})
export class CheckoutB2BRootModule {}
