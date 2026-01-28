/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { SubscriptionProductUsageChargeModule } from './product/usage/subscription-product-usage-charge.module';
import { SubscriptionDetailsModule } from './details/subscription-details.module';
import { SubscriptionProductPriceModule } from './product/price/subscription-product-price.module';
import { SubscriptionListModule } from './list/subscription-list.module';
import { SubscriptionActionsModalModule } from './actions-modal/subscription-actions-modal.module';

@NgModule({
  imports: [
    SubscriptionListModule,
    SubscriptionDetailsModule,
    SubscriptionProductPriceModule,
    SubscriptionProductUsageChargeModule,
    SubscriptionActionsModalModule,
  ],
})
export class SubscriptionBillingComponentsModule {}
