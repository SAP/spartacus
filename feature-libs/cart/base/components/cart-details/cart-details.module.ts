/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { PromotionsModule } from '@spartacus/storefront';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';
import { CartValidationWarningsModule } from '../validation/cart-warnings/cart-validation-warnings.module';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    FeaturesConfigModule,
    I18nModule,
    CartValidationWarningsModule,
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
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent],
})
export class CartDetailsModule {}
