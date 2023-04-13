/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { OpfPaymentResponseComponent } from '../components/opf-payment-response/opf-payment-response.component';
import { defaultOPFRoutingConfig } from './config';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentResponseComponent,
        data: {
          cxRoute: 'paymentresponse',
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'verifypayment',
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
