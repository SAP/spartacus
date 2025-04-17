import { NgModule } from '@angular/core';
import { SubscriptionBillingCartItemPriceHeadingComponent } from './cart-item-price-heading/subscription-billing-cart-item-price-heading.component';
import { SubscriptionBillingCartItemPriceBodyComponent } from './cart-item-price-body/subscription-billing-cart-item-price-body.component';
import { SubscriptionBillingCartChargesComponent } from './cart-charges/subscription-billing-cart-charges.component';
import { SubscriptionBillingCartChargesButtonComponent } from './cart-charges-button/subscription-billing-cart-charges-button.component';
import { CommonModule } from '@angular/common';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { subscriptionBillingCartLayoutConfig } from './subscription-billing-cart-layout.config';
import { ViewSubscriptionChargesEventListener } from './view-subscription-charges-event.listener';
import {
  SubscriptionProductPriceComponent,
  SubscriptionProductUsageChargeComponent,
} from '@spartacus/subscription-billing/components';

let components = [
  SubscriptionBillingCartItemPriceHeadingComponent,
  SubscriptionBillingCartItemPriceBodyComponent,
  SubscriptionBillingCartChargesButtonComponent,
  SubscriptionBillingCartChargesComponent,
];

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    SubscriptionProductPriceComponent,
    SubscriptionProductUsageChargeComponent,
  ],
  declarations: [...components],
  exports: [...components],
  providers: [
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ITEM_PRICE_HEADING,
      position: OutletPosition.AFTER,
      component: SubscriptionBillingCartItemPriceHeadingComponent,
    }),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ITEM_PRICE_BODY,
      position: OutletPosition.AFTER,
      component: SubscriptionBillingCartItemPriceBodyComponent,
    }),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ITEM_CHARGES_BUTTON,
      position: OutletPosition.AFTER,
      component: SubscriptionBillingCartChargesButtonComponent,
    }),
    provideDefaultConfig(subscriptionBillingCartLayoutConfig),
  ],
})
export class SubscriptionBillingCartModule {
  constructor(
    _viewSubscriptionChargesEventListener: ViewSubscriptionChargesEventListener
  ) {
    // Intentional empty constructor
  }
}
