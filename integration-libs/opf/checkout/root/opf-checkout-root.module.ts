/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CHECKOUT_BASE_CMS_COMPONENTS,
  CHECKOUT_FEATURE,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOpfCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfCheckoutRoutingConfig } from './config/default-opf-checkout-routing-config';

export const CHECKOUT_OPF_CMS_COMPONENTS: string[] = [
  'OpfCheckoutPaymentAndReview',
];

export function defaultOpfCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: [
          ...CHECKOUT_BASE_CMS_COMPONENTS,
          ...CHECKOUT_OPF_CMS_COMPONENTS,
        ],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultOpfCheckoutRoutingConfig),
    provideDefaultConfig(defaultOpfCheckoutConfig),
    provideDefaultConfigFactory(defaultOpfCheckoutComponentsConfig),
  ],
})
export class OpfCheckoutRootModule {}
