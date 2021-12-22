import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard } from '@spartacus/checkout/base/components';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CheckoutScheduledReplenishmentPlaceOrderComponent } from './checkout-place-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          component: CheckoutScheduledReplenishmentPlaceOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent],
  exports: [CheckoutScheduledReplenishmentPlaceOrderComponent],
})
export class CheckoutScheduledReplenishmentPlaceOrderModule {}
