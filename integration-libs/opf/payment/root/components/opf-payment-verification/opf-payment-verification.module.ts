/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfPaymentVerificationComponent } from './opf-payment-verification.component';

@NgModule({
  declarations: [OpfPaymentVerificationComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [OpfPaymentVerificationComponent],
})
export class OpfPaymentVerificationModule {}
