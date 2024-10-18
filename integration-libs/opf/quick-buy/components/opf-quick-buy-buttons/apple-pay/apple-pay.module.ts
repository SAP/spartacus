/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplePayComponent } from './apple-pay.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ApplePayComponent],
  exports: [ApplePayComponent],
})
export class OpfApplePayModule {}
