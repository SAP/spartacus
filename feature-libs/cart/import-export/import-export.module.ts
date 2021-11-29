import { NgModule } from '@angular/core';
import {
  ExportOrderEntriesModule,
  ImportExportOrderEntriesModule,
  ImportOrderEntriesModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportOrderEntriesModule,
    ImportOrderEntriesModule,
    ImportExportOrderEntriesModule,
  ],
})
export class ImportExportModule {}
