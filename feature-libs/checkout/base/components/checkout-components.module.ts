/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutDeliveryAddressModule } from './checkout-delivery-address/checkout-delivery-address.module';
import { CheckoutDeliveryModeModule } from './checkout-delivery-mode/checkout-delivery-mode.module';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderSummaryModule } from './checkout-order-summary/checkout-order-summary.module';
import { CheckoutPaymentMethodModule } from './checkout-payment-method/checkout-payment-method.module';
import { CheckoutPlaceOrderModule } from './checkout-place-order/checkout-place-order.module';
import { CheckoutProgressMobileBottomModule } from './checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from './checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './checkout-progress/checkout-progress.module';
import { CheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { CheckoutReviewOverviewModule } from './checkout-review/checkout-review-overview/checkout-review-overview.module';
import { CheckoutReviewPaymentModule } from './checkout-review/checkout-review-payment/checkout-review-payment.module';
import { CheckoutReviewShippingModule } from './checkout-review/checkout-review-shipping/checkout-review-shipping.module';

@NgModule({
  imports: [
    CheckoutOrchestratorModule,
    CheckoutOrderSummaryModule,
    CheckoutProgressModule,
    CheckoutProgressMobileTopModule,
    CheckoutProgressMobileBottomModule,
    CheckoutDeliveryModeModule,
    CheckoutPaymentMethodModule,
    CheckoutPlaceOrderModule,
    CheckoutReviewSubmitModule,
    CheckoutReviewPaymentModule,
    CheckoutReviewShippingModule,
    CheckoutReviewOverviewModule,
    CheckoutDeliveryAddressModule,
    CheckoutLoginModule,
  ],
})
export class CheckoutComponentsModule {}
