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

import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';


@NgModule({
    imports: [
    CartSharedModule,
    CommonModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    I18nModule,
    CartDetailsComponent,
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
