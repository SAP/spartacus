/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MockResponseInterceptor } from './interceptor/mock-response.interceptor';
import {
  provideOutlet,
  ProductDetailOutlets,
  OutletPosition,
} from '@spartacus/storefront';
import { provideDefaultConfig } from '@spartacus/core';
import { SubscriptionProductPriceComponent } from './product/price/subscription-product-price.component';
import { defaultOccSubscriptionBillingConfig } from './occ-config/default-occ-subscription-billing-config';
import { SubscriptionProductModule } from './product';

@NgModule({
  imports: [SubscriptionProductModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockResponseInterceptor,
      multi: true,
    },
    provideOutlet({
      id: ProductDetailOutlets.PRICE,
      position: OutletPosition.REPLACE,
      component: SubscriptionProductPriceComponent,
    }),
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
  ],
})
export class SubscriptionBillingRootModule {}
