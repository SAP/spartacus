import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutAuthGuard } from '../../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from './../../../../../cms-components/cart/cart-not-empty.guard';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';
import { CheckoutStepsSetGuard } from '../../../guards/checkout-steps-set.guard';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  providers: [
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgressMobileBottom: {
          component: CheckoutProgressMobileBottomComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutProgressMobileBottomComponent],
  exports: [CheckoutProgressMobileBottomComponent],
})
export class CheckoutProgressMobileBottomModule {}
