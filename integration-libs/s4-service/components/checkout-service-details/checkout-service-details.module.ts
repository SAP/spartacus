/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/base/components';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CheckoutServiceDetailsComponent } from './checkout-service-details.component';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutServiceDetails: {
          component: CheckoutServiceDetailsComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  exports: [CheckoutServiceDetailsComponent],
  declarations: [CheckoutServiceDetailsComponent],
})
export class CheckoutServiceDetailsModule {}
