/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          component: CheckoutDeliveryModeComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutDeliveryModeComponent],
  exports: [CheckoutDeliveryModeComponent],
})
export class CheckoutDeliveryModeModule {}
