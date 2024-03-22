/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { FormErrorsModule, IconModule } from '@spartacus/storefront';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
import { CartCouponComponent } from './cart-coupon.component';

@NgModule({
  declarations: [CartCouponComponent, AppliedCouponsComponent],
  exports: [CartCouponComponent, AppliedCouponsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    FormErrorsModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartApplyCouponComponent: {
          component: CartCouponComponent,
        },
      },
    }),
    // TODO: (CXSPA-5953) Remove feature flag config next major release
    provideDefaultConfig(<FeaturesConfig>{
      features: {
        a11yRequiredAsterisks: true,
      },
    }),
  ],
})
export class CartCouponModule {}
