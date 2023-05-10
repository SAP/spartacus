/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CART_BASE_FEATURE,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrderConfirmationOrderEntriesContextToken } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';
import { OpfEventModule } from './events/opf-event.module';
import { OPF_FEATURE } from './feature-name';

export function defaultOpfOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_FEATURE]: {
        cmsComponents: ['OpfOrderConfirmationOverviewComponent'],
        dependencies: [CART_BASE_FEATURE],
      },
    },
  };
  return config;
}
@NgModule({
  imports: [
    OpfEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationResult',
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'opfOrderConfirmation',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
          },
        },
      },
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationCancel',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfidValidator),
    provideDefaultConfigFactory(defaultOpfOrderComponentsConfig),
  ],
})
export class OpfRootModule {}
