/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableDataCellComponent } from '../table-data-cell/table-data-cell.component';
import { TableHeaderCellComponent } from '../table-header-cell/table-header-cell.component';
import { TableConfig } from './table.config';

export const defaultTableConfig: TableConfig = {
  tableOptions: {
    headerComponent: TableHeaderCellComponent,
    dataComponent: TableDataCellComponent,
  },
};
