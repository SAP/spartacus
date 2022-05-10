import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PickupDeliveryOptionsComponent } from '../components/pickup-delivery-options';
// import { provideDefaultConfig } from '@spartacus/core';
// import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideOutlet({
      id: CartOutlets.PICKUP_IN_STORE_OPTION,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ]
})
export class PickupInStoreRootModule {}
