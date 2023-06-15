/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';
import { OPF_BASE_FEATURE } from './feature-name';

export function defaultOpfOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_BASE_FEATURE]: {
        cmsComponents: ['OrderConfirmationOverviewComponent'],
        dependencies: [CART_BASE_FEATURE],
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
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
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationCancel',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultOpfConfig),

    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfidValidator),
    provideDefaultConfigFactory(defaultOpfOrderComponentsConfig),
  ],
})
export class OpfBaseRootModule {}
