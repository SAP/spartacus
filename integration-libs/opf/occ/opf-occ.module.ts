/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfAdapter, OtpAdapter } from '@spartacus/opf/core';
import { occOrderV2Config } from '../root/config/opf-order-v2.config';
import { OccOpfAdapter } from './adapters/occ-opf.adapter';
import { OccOtpAdapter } from './adapters/occ-otp.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';
import { defaultOccOtpConfig } from './config/default-occ-otp-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideConfig(occOrderV2Config),
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
export class OpfOccModule {}
