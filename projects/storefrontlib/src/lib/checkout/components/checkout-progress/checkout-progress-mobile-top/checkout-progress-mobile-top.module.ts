import {
  UrlModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
  AuthGuard,
} from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutProgressMobileTopComponent } from './checkout-progress-mobile-top.component';
import { CartNotEmptyGuard } from './../../../../../cms-components/checkout/cart/cart-not-empty.guard';
@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(defaultCheckoutConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgressMobileTop: {
          selector: 'cx-checkout-progress-mobile-top',
          guards: [AuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutProgressMobileTopComponent],
  entryComponents: [CheckoutProgressMobileTopComponent],
  exports: [CheckoutProgressMobileTopComponent],
})
export class CheckoutProgressMobileTopModule {}
