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
import { SubscriptionCartDetailsComponent } from './cart/details/subscription-cart-details.component';

@NgModule({
  imports: [
    SubscriptionListComponent,
    SubscriptionProductPriceComponent,
    SubscriptionProductUsageChargeComponent,
    SubscriptionCartDetailsComponent
  ],
  providers: [
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
        CartComponent: {
          component: SubscriptionCartDetailsComponent,
        }
      },
    }),
  ],
})
export class SubscriptionBillingComponentsModule {}
