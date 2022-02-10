import { RouterModule } from '@angular/router';
import { DpPaymentMethodComponent } from './dp-payment-method.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DpPaymentFormModule } from './dp-payment-form/dp-payment-form.module';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { PaymentMethodModule as CorePaymentMethodModule } from '@spartacus/checkout/components';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { DpPaymentCallbackModule } from './dp-payment-callback/dp-payment-callback.module';

@NgModule({
  imports: [
    CommonModule,
    DpPaymentFormModule,
    RouterModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    DpPaymentCallbackModule,

    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: DpPaymentMethodComponent,
        },
      },
    }),
  ],
  declarations: [DpPaymentMethodComponent],
  exports: [DpPaymentMethodComponent],
})
export class DpPaymentMethodModule extends CorePaymentMethodModule {}
