/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CardModule, IconModule, OutletModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';

@NgModule({
  declarations: [CheckoutReviewShippingComponent],
  exports: [CheckoutReviewShippingComponent],
  imports: [
    CommonModule,
    I18nModule,
    CardModule,
    UrlModule,
    RouterModule,
    IconModule,
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewShipping: {
          component: CheckoutReviewShippingComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class CheckoutReviewShippingModule {}
