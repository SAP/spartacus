/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfAdapter } from '@spartacus/opf/checkout/core';

import { OccOpfAdapter } from './adapters/occ-opf.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfConfig),
    {
      provide: OpfAdapter,
      useClass: OccOpfAdapter,
    },
  ],
})
export class OpfCheckoutOccModule {}
