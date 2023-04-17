/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfVerifyPaymentComponent } from './opf-verify-payment.component';

@NgModule({
  declarations: [OpfVerifyPaymentComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [OpfVerifyPaymentComponent],
})
export class OpfVerifyPaymentModule {}
