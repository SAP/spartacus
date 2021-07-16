import { NgModule } from '@angular/core';
import {
  ExportEntriesModule,
  ImportToCartModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportEntriesModule,
    ImportToCartModule,
  ],
})
export class ImportExportModule {}
