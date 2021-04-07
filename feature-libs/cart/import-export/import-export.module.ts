import { NgModule } from '@angular/core';
import { ImportExportComponentsModule } from './components/import-export-components.module';
import { ImportExportCoreModule } from './core/import-export-core.module';

@NgModule({
  imports: [ImportExportCoreModule.forRoot(), ImportExportComponentsModule],
})
export class ImportExportModule {}
