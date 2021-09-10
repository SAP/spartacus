import { TableDataCellComponent } from '../table-data-cell/table-data-cell.component';
import { TableHeaderCellComponent } from '../table-header-cell/table-header-cell.component';
import { TableConfig } from './table.config';

export const defaultTableConfig: TableConfig = {
  tableOptions: {
    headerComponent: TableHeaderCellComponent,
    dataComponent: TableDataCellComponent,
  },
};
