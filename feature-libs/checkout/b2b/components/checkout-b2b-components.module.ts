import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/components';
import { CheckoutCostCenterModule } from './checkout-cost-center/checkout-cost-center.module';
import { CheckoutPaymentTypeModule } from './checkout-payment-type/checkout-payment-type.module';
import { B2BCheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { B2BCheckoutShippingAddressModule } from './checkout-shipping-address/checkout-shipping-address.module';
import { CheckoutB2BAuthGuard } from './guards/checkout-b2b-auth.guard';
import { CheckoutB2BStepsSetGuard } from './guards/checkout-b2b-steps-set.guard';

@NgModule({
  imports: [
    CommonModule,
    CheckoutCostCenterModule,
    CheckoutPaymentTypeModule,
    B2BCheckoutShippingAddressModule,
    B2BCheckoutReviewSubmitModule,
  ],
  providers: [
    {
      provide: CheckoutAuthGuard,
      useExisting: CheckoutB2BAuthGuard,
    },
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutB2BStepsSetGuard,
    },
  ],
})
export class CheckoutB2BComponentsModule {}
