/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FutureStockAccordionModule } from './future-stock-accordion/future-stock-accordion.module';
import { FutureStockModule } from './future-stock/future-stock.module';

@NgModule({
  imports: [CommonModule, FutureStockModule, FutureStockAccordionModule],
})
export class FutureStockComponentsModule {}
