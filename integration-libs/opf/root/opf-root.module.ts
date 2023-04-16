/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';
import { OpfVerifyPaymentComponent } from '../components/opf-verify-payment';
import { defaultOPFRoutingConfig } from './config';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';

@NgModule({
  imports: [
    RouterModule.forChild([
      // { path: 'redirect/success', redirectTo: 'verify-payment' },
      // {
      //   // @ts-ignore
      //   path: null,
      //   component: OpfPaymentResponseComponent,
      //   data: {
      //     cxRoute: 'paymentresponse',
      //   },
      // },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: OpfVerifyPaymentComponent,
        data: {
          cxRoute: 'paymentresponse',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOPFRoutingConfig),
    provideConfigValidator(opfConfidValidator),
  ],
})
export class OpfRootModule {}
