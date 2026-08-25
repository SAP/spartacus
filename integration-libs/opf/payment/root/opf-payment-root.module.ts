/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideLocationInitializerFactory,
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
    provideLocationInitializerFactory(() => {
      // convert incorrect type `() => void` to `() => Promise<void>`
      const locationInitializer = captureOpfPaymentVerificationQueryFactory();
      return () => Promise.resolve(locationInitializer());
    }),
  ],
})
export class OpfPaymentRootModule {}
