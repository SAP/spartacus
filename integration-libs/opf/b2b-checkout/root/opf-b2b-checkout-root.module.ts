/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OPF_B2B_CHECKOUT_FEATURE } from './feature-name';
import { CheckoutB2BStepsSetGuard } from '@spartacus/checkout/b2b/components';
import { OpfB2bCheckoutStepsSetGuard } from './guards';
import { defaultOpfB2bCheckoutConfig } from './config/default-opf-b2b-checkout-config';
import { defaultOpfB2bCheckoutOccEndpointsConfig } from './config/default-opf-b2b-checkout-occ-endpoints-config';

export const OPF_B2B_CHECKOUT_CMS_COMPONENTS: string[] = [
  'OpfCheckoutPaymentType',
  'OpfCheckoutDeliveryAddress',
  'OpfCheckoutReview',
  'OpfB2bCheckoutPaymentAndReview',
];

export function defaultOpfB2bCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [OPF_B2B_CHECKOUT_FEATURE]: {
        cmsComponents: OPF_B2B_CHECKOUT_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    {
      provide: CheckoutB2BStepsSetGuard,
      useClass: OpfB2bCheckoutStepsSetGuard,
    },
    provideDefaultConfig(defaultOpfB2bCheckoutConfig),
    provideDefaultConfig(defaultOpfB2bCheckoutOccEndpointsConfig),
    provideDefaultConfigFactory(defaultOpfB2bCheckoutComponentsConfig),
  ],
})
export class OpfB2bCheckoutRootModule {}
