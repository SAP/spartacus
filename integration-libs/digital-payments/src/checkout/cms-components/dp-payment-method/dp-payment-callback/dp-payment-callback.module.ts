/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [DpPaymentCallbackComponent],
  exports: [DpPaymentCallbackComponent],
})
export class DpPaymentCallbackModule {}
