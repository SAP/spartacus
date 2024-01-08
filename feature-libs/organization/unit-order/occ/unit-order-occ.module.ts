/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

import { OccOrderNormalizer } from '@spartacus/order/occ';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { UnitOrderAdapter } from '@spartacus/organization/unit-order/core';
import { OccUnitOrderAdapter } from './adapters/occ-unit-order.adapter';
import { defaultOccUnitOrderConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccUnitOrderConfig),
    { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OccOrderNormalizer,
      multi: true,
    },
  ],
})
export class UnitOrderOccModule {}
