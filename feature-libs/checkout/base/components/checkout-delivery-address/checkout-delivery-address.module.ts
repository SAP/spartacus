/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { AddressFormModule } from '@spartacus/user/profile/components';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddressFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryAddress: {
          component: CheckoutDeliveryAddressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutDeliveryAddressComponent],
  exports: [CheckoutDeliveryAddressComponent],
})
export class CheckoutDeliveryAddressModule {}
