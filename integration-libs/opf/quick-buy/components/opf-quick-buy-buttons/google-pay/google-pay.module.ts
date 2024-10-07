/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfGooglePayComponent } from './google-pay.component';
import { OpfGooglePayService } from './google-pay.service';

@NgModule({
  declarations: [OpfGooglePayComponent],
  exports: [OpfGooglePayComponent],
  imports: [CommonModule],
  providers: [OpfGooglePayService],
})
export class OpfGooglePayModule {}
