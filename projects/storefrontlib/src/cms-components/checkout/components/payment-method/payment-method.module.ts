import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { DeliveryModeSetGuard } from '../../guards/delivery-mode-set.guard';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
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
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: PaymentMethodComponent,
          guards: [
            CheckoutAuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
            DeliveryModeSetGuard,
          ],
        },
      },
    }),
  ],
  providers: [UserService],
  declarations: [PaymentMethodComponent],
  entryComponents: [PaymentMethodComponent],
  exports: [PaymentMethodComponent],
})
export class PaymentMethodModule {}
