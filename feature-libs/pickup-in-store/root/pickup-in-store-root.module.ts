import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupDeliveryOptionsComponent } from './components/pickup-delivery-options/pickup-delivery-options.component';
import { PickupInStoreComponentsModule } from './components/pickup-in-store-components.module';
import {
  PICKUP_IN_STORE_CORE_FEATURE,
  PICKUP_IN_STORE_FEATURE,
} from './feature-name';
import { PickupInStoreOutlets } from './models/pickup-in-store.model';

export function defaultPickupInStoreComponentsConfig() {
  const config = {
    featureModules: {
      [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [PickupInStoreComponentsModule],
  providers: [
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
    provideOutlet({
      id: PickupInStoreOutlets.PICKUP_OPTION,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
})
export class PickupInStoreRootModule {}
