/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmCustomer360Adapter } from '@spartacus/asm/customer-360/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccAsmCustomer360Config } from './adapters/default-occ-asm-customer-360-config';
import { OccAsmCustomer360Adapter } from './adapters/occ-asm-customer-360.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccAsmCustomer360Config),
    {
      provide: AsmCustomer360Adapter,
      useClass: OccAsmCustomer360Adapter,
    },
  ],
})
export class AsmCustomer360OccModule {}
