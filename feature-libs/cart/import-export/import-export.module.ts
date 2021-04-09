import { NgModule } from '@angular/core';
import { ImportExportCoreModule } from './core/import-export-core.module';
import { ExportProductListModule } from './components/export-product-list/export-product-list.module';

@NgModule({
  imports: [ImportExportCoreModule.forRoot(), ExportProductListModule],
})
export class ImportExportModule {}
