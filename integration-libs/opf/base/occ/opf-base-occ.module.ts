/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfPaymentAdapter, OtpAdapter } from '@spartacus/opf/base/core';
import { OccOtpAdapter } from './adapters';
import { OccOpfPaymentAdapter } from './adapters/occ-opf.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';
import { defaultOccOtpConfig } from './config/default-occ-otp-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfConfig),
    {
      provide: OpfPaymentAdapter,
      useClass: OccOpfPaymentAdapter,
    },

    provideDefaultConfig(defaultOccOtpConfig),
    {
      provide: OtpAdapter,
      useClass: OccOtpAdapter,
    },
  ],
})
export class OpfBaseOccModule {}
