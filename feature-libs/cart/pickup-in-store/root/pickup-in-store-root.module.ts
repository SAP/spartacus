import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PickupDeliveryOptionsComponent } from '@spartacus/cart/pickup-in-store/components';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';

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
