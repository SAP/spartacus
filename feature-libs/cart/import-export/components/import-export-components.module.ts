import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExportProductListModule } from './export-product-list';

@NgModule({
  imports: [RouterModule, ExportProductListModule],
})
export class ImportExportComponentsModule {}
