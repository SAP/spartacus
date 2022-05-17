import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupDeliveryOptionsComponent } from './components/pickup-delivery-options/pickup-delivery-options.component';
import { PickupInStoreComponentsModule } from './components/pickup-in-store-components.module';
import {
  CART_PICKUP_IN_STORE_CORE_FEATURE,
  CART_PICKUP_IN_STORE_FEATURE,
} from './feature-name';

export function defaultPickupInStoreComponentsConfig() {
  const config = {
    featureModules: {
      [CART_PICKUP_IN_STORE_CORE_FEATURE]: CART_PICKUP_IN_STORE_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [PickupInStoreComponentsModule],
  providers: [
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
    provideOutlet({
      id: CartOutlets.PICKUP_IN_STORE_OPTION,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
})
export class PickupInStoreRootModule {}
