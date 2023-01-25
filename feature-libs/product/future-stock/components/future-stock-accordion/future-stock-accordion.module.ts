/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';
import { IconModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [FutureStockAccordionComponent],
  exports: [FutureStockAccordionComponent],
})
export class FutureStockAccordionModule {}
