import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { TableHeaderCellComponent } from './table-header-cell.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [TableHeaderCellComponent],
})
export class TableHeaderCellModule {}
