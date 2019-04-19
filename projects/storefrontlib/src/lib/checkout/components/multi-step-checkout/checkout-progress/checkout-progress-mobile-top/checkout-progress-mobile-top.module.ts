import {
  UrlTranslationModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { defaultCheckoutConfig } from '../../../../config/default-checkout-config';
import { CheckoutProgressMobileTopComponent } from './checkout-progress-mobile-top.component';

@NgModule({
  imports: [
    CommonModule,
    UrlTranslationModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(defaultCheckoutConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutProgressMobileTop: {
          selector: 'cx-checkout-progress-mobile-top',
        },
      },
    }),
  ],
  declarations: [CheckoutProgressMobileTopComponent],
  entryComponents: [CheckoutProgressMobileTopComponent],
  exports: [CheckoutProgressMobileTopComponent],
})
export class CheckoutProgressMobileTopModule {}
