/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutStepsSetGuard } from '@spartacus/checkout/base/components';
import { CheckoutServiceOrderStepsSetGuard } from './guards';
import { ServiceCheckoutReviewSubmitModule } from './checkout-review-submit/service-checkout-review-submit.module';
import { CheckoutServiceDetailsModule } from './checkout-service-details/checkout-service-details.module';
import { ServiceCheckoutDeliveryModeModule } from './checkout-delivery-mode/service-checkout-delivery-mode.module';

@NgModule({
  imports: [
    ServiceCheckoutReviewSubmitModule,
    CheckoutServiceDetailsModule,
    ServiceCheckoutDeliveryModeModule,
  ],
  providers: [
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutServiceOrderStepsSetGuard,
    },
  ],
})
export class S4ServiceCheckoutComponentModule {}
