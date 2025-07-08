/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  inject,
  NgModule,
  ComponentFactoryResolver
} from '@angular/core';
import { SubscriptionListComponent } from './list/subscription-list.component';
import {
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
  MODULE_INITIALIZER,
} from '@spartacus/core';
import { SubscriptionProductPriceComponent } from './product/price/subscription-product-price.component';
import { SubscriptionProductUsageChargeComponent } from './product/usage/subscription-product-usage-charge.component';
import { SubscriptionDetailsComponent } from './details/subscription-details.component';
import { SubscriptionCartDetailsComponent } from './cart/details/subscription-cart-details.component';
import { SubscriptionCartItemListComponent } from './cart/item-list/subscription-cart-item-list.component';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  OutletPosition,
  OutletService,
} from '@spartacus/storefront';
import { SubscriptionCartPriceHeadingComponent } from './cart/price-heading/subscription-cart-price-heading.component';

export function registerSubscriptionOutletFactory(): () => void {
  const outletService = inject(OutletService);
  const componentFactoryResolver = inject(ComponentFactoryResolver);
  return () => {
    console.log(
      'Registering SubscriptionCartPriceHeadingComponent in CartOutlets'
    );
    const template = componentFactoryResolver.resolveComponentFactory(
        SubscriptionCartPriceHeadingComponent
      );
    outletService.add(
      CartOutlets.SUBSCRIPTION_PRICE_HEADING,
      template,
      OutletPosition.AFTER
    );
  };
}

@NgModule({
  imports: [
    SubscriptionListComponent,
    SubscriptionProductPriceComponent,
    SubscriptionProductUsageChargeComponent,
    SubscriptionCartDetailsComponent,
    SubscriptionCartItemListComponent,
    SubscriptionCartPriceHeadingComponent,
  ],
  exports: [SubscriptionCartPriceHeadingComponent],
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
        },
      },
    }),
    {
      provide: MODULE_INITIALIZER,
      useFactory: registerSubscriptionOutletFactory,
      multi: true,
    },
  ],
})
export class SubscriptionBillingComponentsModule {
  constructor() {
    console.log('SubscriptionBillingComponentsModule loaded');
  }
}
