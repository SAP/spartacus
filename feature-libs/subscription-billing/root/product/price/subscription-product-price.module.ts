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

@NgModule({
  imports: [CommonModule, I18nModule, SubscriptionProductUsageChargeModule],
  providers: [
    provideOutlet({
      id: ProductDetailOutlets.PRICE,
      position: OutletPosition.REPLACE,
      component: SubscriptionProductPriceComponent,
    }),
  ],
  declarations: [SubscriptionProductPriceComponent],
  exports: [SubscriptionProductPriceComponent],
})
export class SubscriptionProductPriceModule {}
