import { NgModule } from '@angular/core';
import { provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PickupDeliveryOptionsComponent } from './components/pickup-delivery-options/pickup-delivery-options.component';
// import {}
// import {
//   ExportOrderEntriesModule,
//   ImportExportOrderEntriesModule,
//   ImportOrderEntriesModule,
// } from '@spartacus/cart/import-export/components';
// import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

@NgModule({
  providers: [
    provideOutlet({
      id: CartOutlets.PICKUP_IN_STORE_OPTION,
      // position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
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
