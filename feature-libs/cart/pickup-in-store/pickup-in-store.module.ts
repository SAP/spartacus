import { NgModule } from '@angular/core';
import { PickupInStoreComponentModule } from './components/pick-up-in-store-components.module';

// import {}
// import {
//   ExportOrderEntriesModule,
//   ImportExportOrderEntriesModule,
//   ImportOrderEntriesModule,
// } from '@spartacus/cart/import-export/components';
// import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  providers: [
  ],
  declarations: [],
  imports: [
    PickupInStoreComponentModule
    // ImportExportCoreModule.forRoot(),
    // ExportOrderEntriesModule,
    // ImportOrderEntriesModule,
    // ImportExportOrderEntriesModule,
  ],
  exports: [],
})
export class PickupInStoreModule {}
