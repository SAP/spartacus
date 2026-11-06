/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';

@NgModule({
  exports: [UnitLevelOrderHistoryFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    UnitLevelOrderHistoryFilterComponent,
  ],
})
export class UnitLevelOrderHistoryFilterModule {}
