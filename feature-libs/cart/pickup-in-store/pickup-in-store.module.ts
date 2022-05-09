import { NgModule } from '@angular/core';
import { PickupDeliveryOptionsComponent } from './components/pickup-delivery-options/pickup-delivery-options.component';
// import {}
// import {
//   ExportOrderEntriesModule,
//   ImportExportOrderEntriesModule,
//   ImportOrderEntriesModule,
// } from '@spartacus/cart/import-export/components';
// import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  declarations: [PickupDeliveryOptionsComponent],
  imports: [
    // ImportExportCoreModule.forRoot(),
    // ExportOrderEntriesModule,
    // ImportOrderEntriesModule,
    // ImportExportOrderEntriesModule,
  ],
  exports: [PickupDeliveryOptionsComponent],
})
export class PickupInStoreModule {}
