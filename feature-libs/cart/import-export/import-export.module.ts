import { NgModule } from '@angular/core';
import {
  CombinedImportExportModule,
  ExportEntriesModule,
  ImportToCartModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportEntriesModule,
    ImportToCartModule,
    CombinedImportExportModule,
  ],
})
export class ImportExportModule {}
