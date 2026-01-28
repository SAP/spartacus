/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import {
  CheckoutAuthGuard,
  CheckoutFlowOrchestratorService,
} from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfApiCheckoutAdapter } from './adapters/opf-api-checkout.adapter';
import { OpfCheckoutAuthGuard } from './checkout-guard';
import { defaultOccOpfCheckoutConfig } from './config';
import { defaultOpfCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfCheckoutRoutingConfig } from './config/default-opf-checkout-routing-config';
import { OpfCheckoutAdapter, OpfCheckoutConnector } from './connectors';
import { OPF_CHECKOUT_FEATURE } from './feature-name';
import { OpfCartUserEmailCheckerService } from './services';

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
    provideAppInitializer(() => {
      inject(CheckoutFlowOrchestratorService);
    }),
  ],
})
export class OpfCheckoutRootModule {}
