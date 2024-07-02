/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutServiceDetailsModule } from './checkout-service-details/checkout-service-details.module';
import { ServiceCheckoutReviewSubmitModule } from './checkout-review-submit/service-checkout-review-submit.module';
import { CheckoutStepsSetGuard } from '@spartacus/checkout/base/components';
import { CheckoutServiceOrderStepsSetGuard } from './guards';

@NgModule({
  imports: [CheckoutServiceDetailsModule, ServiceCheckoutReviewSubmitModule],
  providers: [
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutServiceOrderStepsSetGuard,
    },
  ],
})
export class S4ServiceCheckoutComponentsModule {}
