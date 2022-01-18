import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutLoginModule } from './components/checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './components/checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderSummaryModule } from './components/checkout-order-summary/checkout-order-summary.module';
// eslint-disable-next-line
import { CheckoutProgressMobileBottomModule } from './components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
// eslint-disable-next-line
import { CheckoutProgressMobileTopModule } from './components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './components/checkout-progress/checkout-progress.module';
import { CostCenterModule } from './components/cost-center/cost-center.module';
import { DeliveryModeModule } from './components/delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './components/payment-method/payment-method.module';
import { PaymentTypeModule } from './components/payment-type/payment-type.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';
import { ReviewSubmitModule } from './components/review-submit/review-submit.module';
import { ScheduleReplenishmentOrderModule } from './components/schedule-replenishment-order/schedule-replenishment-order.module';
import { ShippingAddressModule } from './components/shipping-address/shipping-address.module';
import { OrderConfirmationModule } from './order-confirmation/order-confirmation.module';
import { ReplenishmentOrderConfirmationModule } from './order-confirmation/replenishment-order-confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutOrchestratorModule,
    CheckoutOrderSummaryModule,
    CheckoutProgressModule,
    CheckoutProgressMobileTopModule,
    CheckoutProgressMobileBottomModule,
    PaymentTypeModule,
    DeliveryModeModule,
    PaymentMethodModule,
    PlaceOrderModule,
    ScheduleReplenishmentOrderModule,
    ReviewSubmitModule,
    ShippingAddressModule,
    CostCenterModule,
    OrderConfirmationModule,
    ReplenishmentOrderConfirmationModule,
    CheckoutLoginModule,
  ],
})
export class CheckoutComponentsModule {}
