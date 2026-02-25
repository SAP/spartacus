/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfPaymentOccAdapter } from '@spartacus/opf/payment/core';
import { OccOpfPaymentAdapter } from './adapters/occ-opf-payment.adapter';
import { defaultOccOpfPaymentConfig } from './config/default-occ-opf-payment-config';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfPaymentConfig),
    {
      provide: OpfPaymentOccAdapter,
      useClass: OccOpfPaymentAdapter,
    },
  ],
})
export class OpfPaymentOccModule {}
