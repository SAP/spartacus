/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfOrderAdapter, OpfPaymentAdapter } from '@spartacus/opf/base/core';
import { OccOpfOrderAdapter } from './adapters';
import { OccOpfPaymentAdapter } from './adapters/occ-opf.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';
import { defaultOccOpfOrderConfig } from './config/default-occ-opf-order-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfConfig),
    {
      provide: OpfPaymentAdapter,
      useClass: OccOpfPaymentAdapter,
    },
    provideDefaultConfig(defaultOccOpfOrderConfig),
    {
      provide: OpfOrderAdapter,
      useClass: OccOpfOrderAdapter,
    },
  ],
})
export class OpfBaseOccModule {}
