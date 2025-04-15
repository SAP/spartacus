import { NgModule } from '@angular/core';
import {
  provideOutlet,
  OutletPosition,
  IconModule,
} from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { SubscriptionOrderConfirmationComponent } from './subscription-order-confirmation.component';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule],
  declarations: [SubscriptionOrderConfirmationComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ORDER_CONFIRMATION,
      position: OutletPosition.AFTER,
      component: SubscriptionOrderConfirmationComponent,
    }),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_ORDER_REDIRECT,
      position: OutletPosition.AFTER,
      component: SubscriptionOrderConfirmationComponent,
    }),
  ],
  exports: [SubscriptionOrderConfirmationComponent],
})
export class SubscriptionOrderConfirmationModule {}
