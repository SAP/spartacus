/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Customer360Adapter } from '@spartacus/asm/customer-360/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccCustomer360Config } from './adapters/default-occ-customer-360-config';
import { OccCustomer360Adapter } from './adapters/occ-customer-360.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCustomer360Config),
    {
      provide: Customer360Adapter,
      useClass: OccCustomer360Adapter,
    },
  ],
})
export class Customer360OccModule {}
