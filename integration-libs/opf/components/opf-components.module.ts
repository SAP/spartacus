/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfCheckoutBillingAddressFormModule } from './opf-checkout-billing-address-form/opf-checkout-billing-address-form.module';
import { OPFCheckoutPaymentAndReviewModule } from './opf-checkout-payment-and-review/opf-checkout-payment-and-review.module';
import { OpfCheckoutPaymentsModule } from './opf-checkout-payments/opf-checkout-payments.module';

import { OpfVerifyPaymentModule } from './opf-verify-payment/opf-verify-payment.module';

@NgModule({
  imports: [
    OPFCheckoutPaymentAndReviewModule,
    OpfCheckoutPaymentsModule,
    OpfCheckoutBillingAddressFormModule,
    OpfVerifyPaymentModule,
  ],
  providers: [
    // NOTE: Developers are urged to remove mapping for this component via impex script
    // This approach was taken to keep the possibility of maintaining functionality proper way
    // As a side effect, we accept possible console warnings regarding empty mapping
    provideDefaultConfig({
      cmsComponents: {
        CheckoutPlaceOrder: undefined,
      },
    }),
  ],
})
export class OpfComponentsModule {}
