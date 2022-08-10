import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideConfig, provideDefaultConfig } from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { defaultSuggestedAddressLayoutConfig } from 'projects/storefrontlib/cms-components/myaccount/address-book/address-form/suggested-addresses-dialog/default-suggested-address-layout-config';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutPaymentFormModule } from './checkout-payment-form/checkout-payment-form.module';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CheckoutPaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
  providers: [
    provideConfig(defaultSuggestedAddressLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: CheckoutPaymentMethodComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutPaymentMethodComponent],
  exports: [CheckoutPaymentMethodComponent],
})
export class CheckoutPaymentMethodModule {}
