import { NgModule } from '@angular/core';
import { ImportExportCoreModule } from './core/import-export-core.module';
import { ExportEntriesModule } from './components/export-entries/export-entries.module';

@NgModule({
  imports: [ImportExportCoreModule.forRoot(), ExportEntriesModule],
})
export class ImportExportModule {}
