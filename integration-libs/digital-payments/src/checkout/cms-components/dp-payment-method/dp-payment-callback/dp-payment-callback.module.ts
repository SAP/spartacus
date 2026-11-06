/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutBillingAddressFormModule } from '@spartacus/checkout/base/components';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpConfirmationDialogModule } from '../dp-confirmation-dialog/dp-confirmation-dialog.module';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    CheckoutBillingAddressFormModule,
    FeaturesConfigModule,
    DpConfirmationDialogModule,
    DpPaymentCallbackComponent,
  ],
  exports: [DpPaymentCallbackComponent],
})
export class DpPaymentCallbackModule {}
