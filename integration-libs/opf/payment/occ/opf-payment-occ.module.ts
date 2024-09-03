/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfPaymentAdapter } from '@spartacus/opf/payment/core';
import { OccOpfPaymentAdapter } from './adapters/occ-opf-payment.adapter';
import { defaultOccOpfPaymentConfig } from './config/default-occ-opf-payment-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfPaymentConfig),
    {
      provide: OpfPaymentAdapter,
      useClass: OccOpfPaymentAdapter,
    },
  ],
})
export class OpfPaymentOccModule {}
