/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideOutlet,
  ProductDetailOutlets,
  OutletPosition,
  CurrentProductService,
} from '@spartacus/storefront';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccSubscriptionBillingConfig } from './occ/config/default-occ-subscription-billing-config';
import { CurrentSubscriptionProductService } from './services/current-subscription-product.service';
import { SubscriptionProductPriceComponent } from './product-price/subscription-product-price.component';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
    provideOutlet({
      id: ProductDetailOutlets.PRICE,
      position: OutletPosition.REPLACE,
      component: SubscriptionProductPriceComponent,
    }),
    {
      provide: CurrentProductService,
      useExisting: CurrentSubscriptionProductService,
    },
  ],
})
export class SubscriptionProductModule {}
