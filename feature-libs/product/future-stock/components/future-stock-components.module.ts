/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FutureStockAccordionModule } from './future-stock-accordion/future-stock-accordion.module';

@NgModule({
  imports: [CommonModule, FutureStockAccordionModule],
})
export class FutureStockComponentsModule {}
