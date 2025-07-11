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
import { SubscriptionCartPriceBodyComponent } from './cart/price-body/subscription-cart-price-body.component';

export function registerSubscriptionOutletFactory(): () => void {
  const outletService = inject(OutletService);
  const componentFactoryResolver = inject(ComponentFactoryResolver);
  return () => {
    console.log(
      'Registering SubscriptionCartPriceHeadingComponent in CartOutlets'
    );
    const priceHeadingTemplate = componentFactoryResolver.resolveComponentFactory(
        SubscriptionCartPriceHeadingComponent
      );
    const priceBodyTemplate = componentFactoryResolver.resolveComponentFactory(
        SubscriptionCartPriceBodyComponent
      );
    outletService.add(
      CartOutlets.SUBSCRIPTION_PRICE_HEADING,
      priceHeadingTemplate,
      OutletPosition.REPLACE
    );
    outletService.add(
      CartOutlets.SUBSCRIPTION_PRICE_BODY,
      priceBodyTemplate,
      OutletPosition.REPLACE
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
    SubscriptionCartPriceBodyComponent
  ],
  exports: [SubscriptionCartPriceHeadingComponent, SubscriptionCartPriceBodyComponent],
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
