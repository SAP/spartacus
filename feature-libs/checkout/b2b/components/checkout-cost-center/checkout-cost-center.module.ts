/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartValidationGuard } from '@commerce-storefront-toolset/cart/base/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@commerce-storefront-toolset/checkout/base/components';
import { CmsConfig, ConfigModule, I18nModule } from '@commerce-storefront-toolset/core';
import { CheckoutCostCenterComponent } from './checkout-cost-center.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutCostCenterComponent: {
          component: CheckoutCostCenterComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutCostCenterComponent],
})
export class CheckoutCostCenterModule {}
