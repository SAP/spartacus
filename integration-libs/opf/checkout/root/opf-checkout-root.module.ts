/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfApiCheckoutAdapter } from './adapters/opf-api-checkout.adapter';
import { defaultOccOpfCheckoutConfig } from './config';
import { defaultOpfCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfCheckoutRoutingConfig } from './config/default-opf-checkout-routing-config';
import { OpfCheckoutAdapter, OpfCheckoutConnector } from './connectors';
import { OPF_CHECKOUT_FEATURE } from './feature-name';
import { OpfCartUserEmailCheckerService } from './services';
import { OpfCheckoutAuthGuard } from './сheckout-guard/opf-checkout-auth.guard';

export const CHECKOUT_OPF_CMS_COMPONENTS: string[] = [
  'OpfCheckoutPaymentAndReview',
  'OpfCheckoutEmailUpdateComponent',
];

export function defaultOpfCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [OPF_CHECKOUT_FEATURE]: {
        cmsComponents: CHECKOUT_OPF_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    {
      provide: CheckoutAuthGuard,
      useClass: OpfCheckoutAuthGuard,
    },
    {
      provide: OpfCheckoutAdapter,
      useClass: OpfApiCheckoutAdapter,
    },
    OpfCheckoutConnector,
    OpfCartUserEmailCheckerService,
    provideDefaultConfig(defaultOpfCheckoutRoutingConfig),
    provideDefaultConfig(defaultOccOpfCheckoutConfig),
    provideDefaultConfig(defaultOpfCheckoutConfig),
    provideDefaultConfigFactory(defaultOpfCheckoutComponentsConfig),
  ],
})
export class OpfCheckoutRootModule {}
