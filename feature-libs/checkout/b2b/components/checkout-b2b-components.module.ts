import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/components';
import { CostCenterModule } from './cost-center/cost-center.module';
import { CheckoutB2BAuthGuard } from './guards/checkout-b2b-auth.guard';
import { CheckoutB2BStepsSetGuard } from './guards/checkout-b2b-steps-set.guard';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { B2BReviewSubmitModule } from './review-submit/review-submit.module';
import { B2BShippingAddressModule } from './shipping-address/shipping-address.module';

@NgModule({
  imports: [
    CommonModule,
    CostCenterModule,
    PaymentTypeModule,
    B2BShippingAddressModule,
    B2BReviewSubmitModule,
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
