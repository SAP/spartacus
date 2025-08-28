/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionListComponent } from './list/subscription-list.component';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';
import { SubscriptionProductPriceComponent } from './product/price/subscription-product-price.component';
import { SubscriptionProductUsageChargeComponent } from './product/usage/subscription-product-usage-charge.component';
import { SubscriptionDetailsComponent } from './details/subscription-details.component';
import { SubscriptionCancelComponent } from './cancel-subscrption/subscription-cancel.component';
import { subscriptionCancelPopupConfig } from './subscrption-confirm-dialog.config';
import { SubscriptionCartDetailsComponent } from './cart/details/subscription-cart-details.component';
import { SubscriptionCartItemListComponent } from './cart/item-list/subscription-cart-item-list.component';
import { defaultSubscriptionBillingLayoutConfig } from './default-subscription-billing-layout-config';

@NgModule({
  imports: [
    SubscriptionProductPriceComponent,
    SubscriptionCancelComponent,
    SubscriptionProductUsageChargeComponent,
    SubscriptionCartDetailsComponent,
    SubscriptionCartItemListComponent,
  ],
  providers: [provideDefaultConfig(subscriptionCancelPopupConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionHistoryComponent: {
          component: SubscriptionListComponent,
          guards: [AuthGuard],
        },
        SubscriptionProductPriceComponent: {
          component: SubscriptionProductPriceComponent,
        },
        SubscriptionDetailsComponent: {
          component: SubscriptionDetailsComponent,
          guards: [AuthGuard],
        },
         SubscriptionCancelComponent: {
          component: SubscriptionCancelComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(defaultSubscriptionBillingLayoutConfig),
  ],
})
export class SubscriptionBillingComponentsModule {}

