import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
  CheckoutProgressComponent,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/components';
import { CmsConfig, provideConfig } from '@spartacus/core';
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
    // PART 1 test --- it will work
    // B2BCheckoutProgressModule,
  ],
  providers: [
    // {
    //   provide: CheckoutAuthGuard,
    //   useExisting: CheckoutB2BAuthGuard,
    // },
    // {
    //   provide: CheckoutStepsSetGuard,
    //   useExisting: CheckoutB2BStepsSetGuard,
    // },
    // ====================================================
    // PART 2 test --- it will work
    // provideConfig({
    //   cmsComponents: {
    //     CheckoutProgress: {
    //       component: CheckoutProgressComponent,
    //       guards: [
    //         CheckoutB2BAuthGuard,
    //         CartNotEmptyGuard,
    //         CheckoutB2BStepsSetGuard,
    //       ],
    //     },
    //   },
    // }),
    //  ====================================================
    // PART 3 -- won't work - it will work with unified injector in cms guard
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: CheckoutProgressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
        },
      },
    }),
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
