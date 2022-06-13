import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

@NgModule({
  imports: [I18nModule, PickupInStoreCoreModule],
  entryComponents: [PickupDeliveryOptionsComponent],
  declarations: [PickupDeliveryOptionsComponent],
  exports: [PickupDeliveryOptionsComponent],
})
export class PickupDeliveryOptionsModule {}
