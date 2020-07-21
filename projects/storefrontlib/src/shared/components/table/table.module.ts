import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { TableComponent } from './table.component';

/**
 * The TableModule provides a table component that is driven by (responsible) configuration.
 */
@NgModule({
  imports: [CommonModule, OutletModule, I18nModule, IconModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
