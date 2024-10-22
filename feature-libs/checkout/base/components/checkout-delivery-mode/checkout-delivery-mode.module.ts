/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  HierarchyModule,
  OutletModule,
  PageComponentModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    SpinnerModule,
    OutletModule,
    PageComponentModule,
    FeaturesConfigModule,
    HierarchyModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          component: CheckoutDeliveryModeComponent,
          data: {
            composition: {
              inner: ['PickupInStoreDeliveryModeComponent'],
            },
          },
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutDeliveryModeComponent],
  exports: [CheckoutDeliveryModeComponent],
})
export class CheckoutDeliveryModeModule {}
