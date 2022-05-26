import { NgModule } from '@angular/core';
import {
  PickupDeliveryOptionsDialogModule,
  PickupDeliveryOptionsModule,
} from '../components';

@NgModule({
  imports: [PickupDeliveryOptionsModule, PickupDeliveryOptionsDialogModule],
  exports: [PickupDeliveryOptionsModule, PickupDeliveryOptionsDialogModule],
})
export class PickupInStoreComponentsModule {}
