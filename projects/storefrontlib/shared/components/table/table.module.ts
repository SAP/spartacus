/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { defaultTableConfig } from './config/default-table.config';
import { TableDataCellModule } from './table-data-cell/table-data-cell.module';
import { TableHeaderCellModule } from './table-header-cell/table-header-cell.module';
import { TableComponent } from './table.component';

/**
 * The TableModule provides a table component that is driven by (responsible) configuration.
 */
@NgModule({
  imports: [
    CommonModule,
    OutletModule,
    TableHeaderCellModule,
    TableDataCellModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
  providers: [provideDefaultConfig(defaultTableConfig)],
})
export class TableModule {}
