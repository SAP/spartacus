/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfPaymentAdapter } from '@spartacus/opf/payment/core';
import { OpfApiPaymentAdapter } from './adapters';
import { defaultOpfApiPaymentConfig } from './config/default-opf-api-payment-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOpfApiPaymentConfig),
    {
      provide: OpfPaymentAdapter,
      useClass: OpfApiPaymentAdapter,
    },
  ],
})
export class OpfApiPaymentModule {}
