import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutDeliveryModeModule } from './checkout-delivery-mode/checkout-delivery-mode.module';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderConfirmationModule } from './checkout-order-confirmation/checkout-order-confirmation.module';
import { CheckoutOrderSummaryModule } from './checkout-order-summary/checkout-order-summary.module';
import { CheckoutPaymentMethodModule } from './checkout-payment-method/checkout-payment-method.module';
import { CheckoutPlaceOrderModule } from './checkout-place-order/checkout-place-order.module';
import { CheckoutProgressMobileBottomModule } from './checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from './checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './checkout-progress/checkout-progress.module';
import { CheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { CheckoutShippingAddressModule } from './checkout-shipping-address/checkout-shipping-address.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutOrchestratorModule,
    CheckoutOrderSummaryModule,
    CheckoutProgressModule,
    CheckoutProgressMobileTopModule,
    CheckoutProgressMobileBottomModule,
    CheckoutDeliveryModeModule,
    CheckoutPaymentMethodModule,
    CheckoutPlaceOrderModule,
    CheckoutReviewSubmitModule,
    CheckoutShippingAddressModule,
    CheckoutOrderConfirmationModule,
    CheckoutLoginModule,
  ],
})
export class CheckoutComponentsModule {}
