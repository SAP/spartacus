import { NgModule } from '@angular/core';
import {
  PickupDeliveryOptionsDialogModule,
  PickupDeliveryOptionsModule,
} from '../components';
import { StoreListModule } from './store-list';
import { StoreSearchModule } from './store-search/store-search.module';

@NgModule({
  imports: [
    PickupDeliveryOptionsModule,
    PickupDeliveryOptionsDialogModule,
    StoreListModule,
    StoreSearchModule,
  ],
  exports: [
    PickupDeliveryOptionsModule,
    PickupDeliveryOptionsDialogModule,
    StoreListModule,
    StoreSearchModule,
  ],
  declarations: [],
})
export class PickupInStoreComponentsModule {}
