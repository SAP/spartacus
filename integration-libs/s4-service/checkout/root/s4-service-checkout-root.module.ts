/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CheckoutServiceDetailsEventModule } from './events/checkout-service-details-event.module';
import {
  defaultCheckoutServiceDetailsRoutingConfig,
  defaultServiceDetailsCheckoutConfig,
} from './config';
import { NgModule } from '@angular/core';
import {
  CHECKOUT_FEATURE,
  CheckoutConfig,
} from '@spartacus/checkout/base/root';
import { CHECKOUT_B2B_CMS_COMPONENTS } from '@spartacus/checkout/b2b/root';

export const S4_SERVICE_CMS_COMPONENTS: string[] = [
  ...CHECKOUT_B2B_CMS_COMPONENTS,
  'CheckoutServiceDetails',
];

export function defaultS4ServiceComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: S4_SERVICE_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutServiceDetailsEventModule],
  providers: [
    //check why we cannot use the below?
    // provideDefaultConfig(defaultServiceDetailsCheckoutConfig),
    { provide: CheckoutConfig, useValue: defaultServiceDetailsCheckoutConfig },
    provideDefaultConfig(defaultCheckoutServiceDetailsRoutingConfig),
    provideDefaultConfigFactory(defaultS4ServiceComponentsConfig),
  ],
})
export class S4ServiceCheckoutRootModule {}
