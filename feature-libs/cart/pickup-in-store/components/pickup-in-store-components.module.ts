import { NgModule } from '@angular/core';
import { PickupDeliveryOptionsModule } from '@spartacus/cart/pickup-in-store/components';

@NgModule({
  imports: [PickupDeliveryOptionsModule],
  exports: [PickupDeliveryOptionsModule],
})
export class PickupInStoreComponentsModule {}
