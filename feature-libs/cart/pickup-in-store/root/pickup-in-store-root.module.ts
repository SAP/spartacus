import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PickupDeliveryOptionsComponent } from '../components/pickup-delivery-options';

@NgModule({
  providers: [
    provideOutlet({
      id: CartOutlets.PICKUP_IN_STORE_OPTION,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
})
export class PickupInStoreRootModule {}
