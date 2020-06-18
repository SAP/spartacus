import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, OutletModule, I18nModule, IconModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
