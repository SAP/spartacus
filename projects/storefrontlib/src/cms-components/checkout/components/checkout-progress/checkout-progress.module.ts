import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { defaultCheckoutConfig } from '../../config/default-checkout-config';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { CheckoutProgressComponent } from './checkout-progress.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [CheckoutProgressComponent],
  entryComponents: [CheckoutProgressComponent],
  exports: [CheckoutProgressComponent],
  providers: [
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: CheckoutProgressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class CheckoutProgressModule {}
