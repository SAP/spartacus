/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  HierarchyModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartValidationWarningsModule } from '../validation/cart-warnings/cart-validation-warnings.module';
import { CartDetailsComponent } from './cart-details.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    I18nModule,
    CartValidationWarningsModule,
    CartDetailsComponent,
    HierarchyModule,
    OutletModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartComponent: {
          component: CartDetailsComponent,
        },
      },
    }),
  ],
  exports: [CartDetailsComponent],
})
export class CartDetailsModule {}
