import {
  UrlModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(defaultCheckoutConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutProgressMobileBottom: {
          selector: 'cx-checkout-progress-mobile-bottom',
        },
      },
    }),
  ],
  declarations: [CheckoutProgressMobileBottomComponent],
  entryComponents: [CheckoutProgressMobileBottomComponent],
  exports: [CheckoutProgressMobileBottomComponent],
})
export class CheckoutProgressMobileBottomModule {}
