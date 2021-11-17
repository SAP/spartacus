import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';
import { defaultPlaceOrderSpinnerLayoutConfig } from './default-place-order-spinner-layout.config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideConfig(defaultPlaceOrderSpinnerLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          component: CheckoutPlaceOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutPlaceOrderComponent],
  exports: [CheckoutPlaceOrderComponent],
})
export class CheckoutPlaceOrderModule {}
