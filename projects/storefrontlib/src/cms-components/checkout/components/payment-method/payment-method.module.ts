import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { PaymentFormModule } from './payment-form/payment-form.module';
import { PaymentMethodComponent } from './payment-method.component';

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
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [PaymentMethodComponent],
  exports: [PaymentMethodComponent],
})
export class PaymentMethodModule {}
