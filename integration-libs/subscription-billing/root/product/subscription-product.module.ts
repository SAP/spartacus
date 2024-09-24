import { NgModule } from '@angular/core';
import { SubscriptionProductPriceComponent } from './product-price/subscription-product-price.component';
import {
  provideOutlet,
  ProductDetailOutlets,
  OutletPosition,
} from '@spartacus/storefront';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SubscriptionProductUsageChargeComponent } from './product-price/subscription-product-usage-charge.component';
import { CommonModule } from '@angular/common';
import { defaultOccSubscriptionBillingConfig } from './occ/config/default-occ-subscription-billing-config';
// import { MockInterceptor } from '../dummy/dummy-http-interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

const componentList = [
  SubscriptionProductPriceComponent,
  SubscriptionProductUsageChargeComponent,
];

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MockInterceptor,
    //   multi: true,
    // },
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
    provideOutlet({
      id: ProductDetailOutlets.PRICE,
      position: OutletPosition.REPLACE,
      component: SubscriptionProductPriceComponent,
    }),
  ],
  exports: componentList,
  declarations: componentList,
})
export class SubscriptionProductModule {}
