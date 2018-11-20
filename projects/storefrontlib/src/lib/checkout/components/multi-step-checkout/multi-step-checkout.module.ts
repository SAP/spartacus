import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartModule } from '../../../cart/cart.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { DeliveryModeModule } from './delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ReviewSubmitModule } from './review-submit/review-submit.module';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    CartSharedModule,

    ShippingAddressModule,
    DeliveryModeModule,
    PaymentMethodModule,
    ReviewSubmitModule
  ],
  declarations: [MultiStepCheckoutComponent],
  exports: [MultiStepCheckoutComponent]
})
export class MultiStepCheckoutModule {}
