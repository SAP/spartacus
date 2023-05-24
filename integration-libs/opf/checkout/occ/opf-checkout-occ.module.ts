/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfAdapter, OtpAdapter } from '@spartacus/opf/checkout/core';

import { OccOpfAdapter } from './adapters/occ-opf.adapter';
import { OccOtpAdapter } from './adapters/occ-otp.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';
import { defaultOccOtpConfig } from './config/default-occ-otp-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfConfig),
    {
      provide: OpfAdapter,
      useClass: OccOpfAdapter,
    },
    provideDefaultConfig(defaultOccOtpConfig),
    {
      provide: OtpAdapter,
      useClass: OccOtpAdapter,
    },
  ],
})
export class OpfCheckoutOccModule {}
