/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { FutureStockComponentsModule } from '@spartacus/product/future-stock/components';
import { FutureStockCoreModule } from '@spartacus/product/future-stock/core';
import { FutureStockOccModule } from '@spartacus/product/future-stock/occ';

@NgModule({
  imports: [
    FutureStockCoreModule.forRoot(),
    FutureStockOccModule,
    FutureStockComponentsModule,
  ],
})
export class FutureStockModule {}
