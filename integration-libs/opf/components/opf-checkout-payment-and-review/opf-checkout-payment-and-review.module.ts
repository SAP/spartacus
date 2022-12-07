/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPFCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';
import { provideDefaultConfig, CmsConfig, I18nModule } from '@spartacus/core';
import {
  CheckoutAuthGuard,
  CartNotEmptyGuard,
} from '@spartacus/checkout/base/components';

@NgModule({
  declarations: [OPFCheckoutPaymentAndReviewComponent],
  imports: [CommonModule, I18nModule],

  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOrder: {
          component: OPFCheckoutPaymentAndReviewComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class OPFCheckoutPaymentAndReviewModule {}
