/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LOCATION_INITIALIZED_MULTI,
  provideDefaultConfig,
} from '@spartacus/core';
import { OpfPaymentMethodDetailsModule } from './components/opf-payment-method-details';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { captureOpfPaymentVerificationQueryFactory } from './components/opf-payment-verification/opf-payment-verification.service';
import { defaultOpfPaymentRoutingConfig } from './config';

@NgModule({
  imports: [
    OpfPaymentMethodDetailsModule,
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
    provideDefaultConfig(defaultOpfPaymentRoutingConfig),
    {
      provide: LOCATION_INITIALIZED_MULTI,
      useFactory: captureOpfPaymentVerificationQueryFactory,
      multi: true,
    },
  ],
})
export class OpfPaymentRootModule {}
