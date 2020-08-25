import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { defaultTableConfig } from './config/default-table.config';
import { TableHeaderCellModule } from './table-header-cell/table-header-cell.module';
import { TableComponent } from './table.component';
import { TableDataCellModule } from './table.data-cell/table-data-cell.module';

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
  providers: [provideConfig(defaultTableConfig)],
})
export class TableModule {}
