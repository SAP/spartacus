import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutLoginRegisterModule } from './components/checkout-login-register/checkout-login-register.module';
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
import { PromotionsModule } from './components/promotions/promotions.module';
import { ReviewSubmitModule } from './components/review-submit/review-submit.module';
import { ScheduleReplenishmentOrderModule } from './components/schedule-replenishment-order/schedule-replenishment-order.module';
import { ShippingAddressModule } from './components/shipping-address/shipping-address.module';
import { CheckoutAuthGuard } from './guards/checkout-auth.guard';
import { CheckoutDetailsLoadedGuard } from './guards/checkout-details-loaded.guard';
import { CheckoutStepsSetGuard } from './guards/checkout-steps-set.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { DeliveryModeSetGuard } from './guards/delivery-mode-set.guard';
import { NotCheckoutAuthGuard } from './guards/not-checkout-auth.guard';
import { PaymentDetailsSetGuard } from './guards/payment-details-set.guard';
import { ShippingAddressSetGuard } from './guards/shipping-address-set.guard';
import { CheckoutConfigService } from './services/checkout-config.service';
import { CheckoutDetailsService } from './services/checkout-details.service';
import { CheckoutReplenishmentFormService } from './services/checkout-replenishment-form-service';
import { CheckoutStepService } from './services/checkout-step.service';
import { ExpressCheckoutService } from './services/express-checkout.service';

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
    PromotionsModule,
    ReviewSubmitModule,
    ShippingAddressModule,
    CostCenterModule,
    CheckoutLoginRegisterModule,
  ],
  providers: [
    CheckoutAuthGuard,
    CheckoutDetailsLoadedGuard,
    CheckoutStepsSetGuard,
    CheckoutGuard,
    DeliveryModeSetGuard,
    NotCheckoutAuthGuard,
    PaymentDetailsSetGuard,
    ShippingAddressSetGuard,
    CheckoutConfigService,
    CheckoutDetailsService,
    CheckoutReplenishmentFormService,
    CheckoutStepService,
    ExpressCheckoutService,
  ],
})
export class CheckoutComponentsModule {}
