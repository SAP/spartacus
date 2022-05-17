import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

@NgModule({
  imports: [I18nModule],
  providers: [
    // provideOutlet({
    //   id: CartOutlets.PICKUP_IN_STORE_OPTION,
    //   position: OutletPosition.REPLACE,
    //   component: PickupDeliveryOptionsComponent,
    // }),
  ],
  entryComponents: [PickupDeliveryOptionsComponent],
  declarations: [PickupDeliveryOptionsComponent],
  exports: [PickupDeliveryOptionsComponent],
})
export class PickupDeliveryOptionsModule {}
