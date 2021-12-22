import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  providers: [
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
