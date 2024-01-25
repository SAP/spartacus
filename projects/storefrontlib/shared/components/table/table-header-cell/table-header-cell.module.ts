/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { TableHeaderCellComponent } from './table-header-cell.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [TableHeaderCellComponent],
})
export class TableHeaderCellModule {}
