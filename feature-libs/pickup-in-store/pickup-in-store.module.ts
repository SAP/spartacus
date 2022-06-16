import { NgModule } from '@angular/core';
import { PickupInStoreComponentsModule } from '@spartacus/pickup-in-store/components';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { StockOccModule } from '@spartacus/pickup-in-store/occ';

@NgModule({
  imports: [
    PickupInStoreComponentsModule,
    PickupInStoreCoreModule,
    StockOccModule,
  ],
})
export class PickupInStoreModule {}
