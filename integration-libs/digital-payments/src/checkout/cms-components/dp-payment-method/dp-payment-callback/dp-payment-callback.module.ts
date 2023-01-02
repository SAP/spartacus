/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [DpPaymentCallbackComponent],
  exports: [DpPaymentCallbackComponent],
})
export class DpPaymentCallbackModule {}
