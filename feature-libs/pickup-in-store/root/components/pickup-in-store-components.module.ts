import { NgModule } from '@angular/core';
import {
  PickupDeliveryOptionsDialogModule,
  PickupDeliveryOptionsModule,
} from '../components';
import { StoreListModule } from './store-list';

@NgModule({
  imports: [
    PickupDeliveryOptionsModule,
    PickupDeliveryOptionsDialogModule,
    StoreListModule,
  ],
  exports: [
    PickupDeliveryOptionsModule,
    PickupDeliveryOptionsDialogModule,
    StoreListModule,
  ],
})
export class PickupInStoreComponentsModule {}
