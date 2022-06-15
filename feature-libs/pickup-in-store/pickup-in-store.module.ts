import { NgModule } from '@angular/core';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { PickupInStoreComponentsModule } from './components';
import { StockOccModule } from './occ/stock-occ.module';

@NgModule({
  imports: [
    PickupInStoreCoreModule,
    StockOccModule,
    PickupInStoreComponentsModule,
  ],
})
export class PickupInStoreModule {}
