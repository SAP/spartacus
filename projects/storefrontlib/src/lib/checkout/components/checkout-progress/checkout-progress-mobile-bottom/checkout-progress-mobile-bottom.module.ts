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
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';
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
        CheckoutProgressMobileBottom: {
          selector: 'cx-checkout-progress-mobile-bottom',
          guards: [AuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutProgressMobileBottomComponent],
  entryComponents: [CheckoutProgressMobileBottomComponent],
  exports: [CheckoutProgressMobileBottomComponent],
})
export class CheckoutProgressMobileBottomModule {}
