import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutDeliveryModeModule } from './components/checkout-delivery-mode/checkout-delivery-mode.module';
import { CheckoutLoginModule } from './components/checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './components/checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderConfirmationModule } from './components/checkout-order-confirmation/checkout-order-confirmation.module';
import { CheckoutOrderSummaryModule } from './components/checkout-order-summary/checkout-order-summary.module';
import { CheckoutPaymentMethodModule } from './components/checkout-payment-method/checkout-payment-method.module';
import { CheckoutPlaceOrderModule } from './components/checkout-place-order/checkout-place-order.module';
import { CheckoutProgressMobileBottomModule } from './components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from './components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './components/checkout-progress/checkout-progress.module';
import { CheckoutReviewSubmitModule } from './components/checkout-review-submit/checkout-review-submit.module';
import { CheckoutShippingAddressModule } from './components/checkout-shipping-address/checkout-shipping-address.module';

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
