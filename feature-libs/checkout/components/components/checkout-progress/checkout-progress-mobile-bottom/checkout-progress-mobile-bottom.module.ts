import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '@spartacus/storefront';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutAuthGuard } from '../../../guards/checkout-auth.guard';
import { CheckoutStepsSetGuard } from '../../../guards/checkout-steps-set.guard';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

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
  entryComponents: [CheckoutProgressMobileBottomComponent],
  exports: [CheckoutProgressMobileBottomComponent],
})
export class CheckoutProgressMobileBottomModule {}
