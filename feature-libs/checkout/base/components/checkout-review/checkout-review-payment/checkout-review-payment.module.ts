/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutReviewPaymentComponent } from './checkout-review-payment.component';

@NgModule({
  declarations: [CheckoutReviewPaymentComponent],
  exports: [CheckoutReviewPaymentComponent],
  imports: [
    CommonModule,
    CardModule,
    I18nModule,
    UrlModule,
    RouterModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewPayment: {
          component: CheckoutReviewPaymentComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
    provideOutlet({
      id: CartOutlets.PAYMENT_INFO,
      component: CheckoutReviewPaymentComponent,
      position: OutletPosition.REPLACE,
    }),
  ],
})
export class CheckoutReviewPaymentModule {}
