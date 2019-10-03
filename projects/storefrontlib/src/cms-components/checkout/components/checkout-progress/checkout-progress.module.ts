import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  Config,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CheckoutConfig } from '../../config/checkout-config';
import { defaultCheckoutConfig } from '../../config/default-checkout-config';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { CheckoutProgressComponent } from './checkout-progress.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(defaultCheckoutConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: CheckoutProgressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutProgressComponent],
  entryComponents: [CheckoutProgressComponent],
  exports: [CheckoutProgressComponent],
  providers: [{ provide: CheckoutConfig, useExisting: Config }],
})
export class CheckoutProgressModule {}
