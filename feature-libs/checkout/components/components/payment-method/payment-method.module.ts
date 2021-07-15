import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  CardModule,
  CartNotEmptyGuard,
  SpinnerModule,
} from '@spartacus/storefront';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { PaymentFormModule } from './payment-form/payment-form.module';
import { PaymentMethodComponent } from './payment-method.component';

import { CartValidationGuard } from '@spartacus/cart/validation/components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: PaymentMethodComponent,
          // TODO(#8880): Shouldn't we keep ShippingAddressSetGuard and others here?
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [PaymentMethodComponent],
  exports: [PaymentMethodComponent],
})
export class PaymentMethodModule {}
