import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import {
  provideOutlet,
  ProductDetailOutlets,
  OutletPosition,
} from '@spartacus/storefront';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';
import { SubscriptionProductUsageChargeModule } from '../usage/subscription-product-usage-charge.module';
import { CartOutlets } from '@spartacus/cart/base/root';

@NgModule({
  imports: [CommonModule, I18nModule, SubscriptionProductUsageChargeModule],
  providers: [
    provideOutlet({
      id: ProductDetailOutlets.PRICE,
      position: OutletPosition.REPLACE,
      component: SubscriptionProductPriceComponent,
    }),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ORDER_CONFIRMATION,
      position: OutletPosition.AFTER,
      component: SubscriptionProductPriceComponent,
    }),
  ],
  declarations: [SubscriptionProductPriceComponent],
  exports: [SubscriptionProductPriceComponent],
})
export class SubscriptionProductPriceModule {}
