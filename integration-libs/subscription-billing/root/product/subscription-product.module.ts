/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionProductPriceComponent } from './product-price/subscription-product-price.component';
import {
  provideOutlet,
  ProductDetailOutlets,
  OutletPosition,
  CurrentProductService,
} from '@spartacus/storefront';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SubscriptionProductUsageChargeComponent } from './product-price/subscription-product-usage-charge.component';
import { CommonModule } from '@angular/common';
import { defaultOccSubscriptionBillingConfig } from './occ/config/default-occ-subscription-billing-config';
import { CurrentSubscriptionProductService } from './services/current-subscription-product.service';

const componentList = [
  SubscriptionProductPriceComponent,
  SubscriptionProductUsageChargeComponent,
];

@NgModule({
  imports: [CommonModule, I18nModule],
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
  exports: componentList,
  declarations: componentList,
})
export class SubscriptionProductModule {}
