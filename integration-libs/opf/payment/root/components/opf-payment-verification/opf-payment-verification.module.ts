/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfPaymentVerificationComponent } from './opf-payment-verification.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, OpfPaymentVerificationComponent],
  exports: [OpfPaymentVerificationComponent],
})
export class OpfPaymentVerificationModule {}
