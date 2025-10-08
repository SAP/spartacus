/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';

import { SubscriptionModalComponent } from './modal-subscrption/subscription-modal.component';
import { subscriptionCancelPopupConfig } from './subscrption-confirm-dialog.config';

import { SubscriptionProductUsageChargeModule } from './product/usage/subscription-product-usage-charge.module';
import { SubscriptionDetailsModule } from './details/subscription-details.module';
import { SubscriptionProductPriceModule } from './product/price/subscription-product-price.module';
import { SubscriptionListModule } from './list/subscription-list.module';

@NgModule({
  imports: [
    SubscriptionListModule,
    SubscriptionDetailsModule,
    SubscriptionProductPriceModule,
    SubscriptionProductUsageChargeModule,
  ],
  providers: [
    provideDefaultConfig(subscriptionCancelPopupConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionCancelComponent: {
          component: SubscriptionModalComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionBillingComponentsModule {}
