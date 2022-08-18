/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  PickupLocationAdapter,
  StockAdapter,
} from '@spartacus/pickup-in-store/core';
import {
  defaultOccPickupLocationConfig,
  OccPickupLocationAdapter,
} from './adapters';

import { defaultOccStockConfig } from './adapters/default-occ-stock-config';
import { OccStockAdapter } from './adapters/occ-stock.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccStockConfig),
    provideDefaultConfig(defaultOccPickupLocationConfig),
    { provide: StockAdapter, useClass: OccStockAdapter },
    { provide: PickupLocationAdapter, useClass: OccPickupLocationAdapter },
  ],
})
export class PickupInStoreOccModule {}
