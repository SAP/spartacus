import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  Config,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '../../../cart/cart-not-empty.guard';
import { CheckoutConfig } from '../../config/checkout-config';
import { defaultCheckoutConfig } from '../../config/default-checkout-config';
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
          selector: 'cx-checkout-progress',
          guards: [AuthGuard, CartNotEmptyGuard],
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
