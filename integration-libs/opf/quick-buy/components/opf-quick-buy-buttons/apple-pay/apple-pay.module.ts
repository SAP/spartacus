/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplePayComponent } from './apple-pay.component';

@NgModule({
  imports: [CommonModule, ApplePayComponent],
  exports: [ApplePayComponent],
})
export class OpfApplePayModule {}
