/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutBillingAddressFormModule } from '@spartacus/checkout/base/components';
import { DpConfirmationDialogModule } from '../dp-confirmation-dialog/dp-confirmation-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    CheckoutBillingAddressFormModule,
    FeaturesConfigModule,
    DpConfirmationDialogModule,
  ],
  declarations: [DpPaymentCallbackComponent],
  exports: [DpPaymentCallbackComponent],
})
export class DpPaymentCallbackModule {}
