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
  OutletModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
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
    OutletModule.forChild(),
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
    provideOutlet({
      id: CartOutlets.DELIVERY_CONSIGNMENT_LIST,
      component: CheckoutReviewShippingComponent,
      position: OutletPosition.BEFORE,
    }),
    provideOutlet({
      id: CartOutlets.DELIVERY_ITEM_LIST,
      component: CheckoutReviewShippingComponent,
      position: OutletPosition.REPLACE,
    }),
  ],
})
export class CheckoutReviewShippingModule {}
