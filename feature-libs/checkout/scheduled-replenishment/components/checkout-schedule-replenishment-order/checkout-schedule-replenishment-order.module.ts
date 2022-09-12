/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@commerce-storefront-toolset/checkout/base/components';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@commerce-storefront-toolset/core';
import { IconModule } from '@commerce-storefront-toolset/storefront';
import { CheckoutScheduleReplenishmentOrderComponent } from './checkout-schedule-replenishment-order.component';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutScheduleReplenishmentOrder: {
          component: CheckoutScheduleReplenishmentOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutScheduleReplenishmentOrderComponent],
  exports: [CheckoutScheduleReplenishmentOrderComponent],
})
export class CheckoutScheduleReplenishmentOrderModule {}
