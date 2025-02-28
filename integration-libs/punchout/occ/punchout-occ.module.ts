/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

import { PunchoutAdapter } from '@spartacus/punchout/core';
import { OccPunchoutAdapter } from './adapters/occ-punchout.adapter';
import { defaultOccPunchoutConfig } from './config/default-occ-punchout-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccPunchoutConfig),
    {
      provide: PunchoutAdapter,
      useClass: OccPunchoutAdapter,
    },
  ],
})
export class PunchoutOccModule {}
