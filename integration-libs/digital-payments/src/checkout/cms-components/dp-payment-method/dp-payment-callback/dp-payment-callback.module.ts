/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutBillingAddressFormModule } from '@spartacus/checkout/base/components';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule, CheckoutBillingAddressFormModule],
  declarations: [DpPaymentCallbackComponent],
  exports: [DpPaymentCallbackComponent],
})
export class DpPaymentCallbackModule {}
