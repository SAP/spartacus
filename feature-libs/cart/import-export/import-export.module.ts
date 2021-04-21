import { NgModule } from '@angular/core';
import {
  ExportEntriesModule,
  ImportToCartModule,
} from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';
import { ImportEntriesComponent } from './components/import-to-cart/import-entries/import-entries.component';

@NgModule({
  imports: [
    ImportExportCoreModule.forRoot(),
    ExportEntriesModule,
    ImportToCartModule,
  ],
  declarations: [ImportEntriesComponent],
})
export class ImportExportModule {}
