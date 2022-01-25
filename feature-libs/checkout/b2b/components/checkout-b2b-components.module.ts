import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutCostCenterModule } from './checkout-cost-center/checkout-cost-center.module';
import { CheckoutPaymentTypeModule } from './checkout-payment-type/checkout-payment-type.module';
import { B2BCheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { B2BCheckoutDeliveryAddressModule } from './checkout-shipping-address/checkout-delivery-address.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutCostCenterModule,
    CheckoutPaymentTypeModule,
    B2BCheckoutDeliveryAddressModule,
    B2BCheckoutReviewSubmitModule,
  ],
})
export class CheckoutB2BComponentsModule {}
