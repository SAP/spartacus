import { NgModule } from '@angular/core';
import {
  ImportExportComponentModule,
  ExportEntriesModule,
  ImportToCartModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportEntriesModule,
    ImportToCartModule,
    ImportExportComponentModule,
  ],
})
export class ImportExportModule {}
