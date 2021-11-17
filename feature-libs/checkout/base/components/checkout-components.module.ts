import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutDeliveryModeModule } from './components/checkout-delivery-mode/checkout-delivery-mode.module';
import { CheckoutLoginModule } from './components/checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './components/checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderSummaryModule } from './components/checkout-order-summary/checkout-order-summary.module';
import { CheckoutPaymentMethodModule } from './components/checkout-payment-method/checkout-payment-method.module';
import { CheckoutPlaceOrderModule } from './components/checkout-place-order/checkout-place-order.module';
import { CheckoutProgressMobileBottomModule } from './components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from './components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './components/checkout-progress/checkout-progress.module';
import { ReviewSubmitModule } from './components/review-submit/review-submit.module';
import { ShippingAddressModule } from './components/shipping-address/shipping-address.module';
import { OrderConfirmationModule } from './order-confirmation/order-confirmation.module';

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
    ReviewSubmitModule,
    ShippingAddressModule,
    OrderConfirmationModule,
    CheckoutLoginModule,
  ],
})
export class CheckoutComponentsModule {}
