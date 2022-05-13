import { NgModule } from '@angular/core';

import { PickupDeliveryOptionsModule } from './pickup-delivery-options/pickup-delivery-options.module';

@NgModule({
  imports: [PickupDeliveryOptionsModule],
  exports: [PickupDeliveryOptionsModule],
})
export class PickupInStoreComponentsModule {}
