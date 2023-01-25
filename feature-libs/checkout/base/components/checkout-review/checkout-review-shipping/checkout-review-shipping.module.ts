/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CardModule, IconModule, OutletModule } from '@spartacus/storefront';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';

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
